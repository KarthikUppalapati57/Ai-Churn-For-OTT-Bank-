from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load Models and Encoders
print("🔄 Loading models and encoders...")
ott_model = joblib.load('ott_churn_model.pkl')
ott_label_encoders = joblib.load('ott_label_encoders.pkl')
bank_model = joblib.load('bank_churn_model.pkl')
bank_label_encoders = joblib.load('bank_label_encoders.pkl')
print("✅ Models and encoders loaded!")


# 📌 **Endpoint for OTT Prediction**
@app.route('/predict-ott', methods=['POST'])
def predict_ott():
    try:
        # Receive Data
        data = request.json
        print(f"📥 Received OTT input: {data}")
        
        # Fill missing fields with defaults
        data.setdefault('multi_screen', 0)
        data.setdefault('mail_subscribed', 0)

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        # 🔄 **Apply label encoding with lowercase transformation**
        if 'gender' in input_df.columns:
            input_df['gender'] = pd.to_numeric(input_df['gender'], errors='coerce')

        # 🔄 **Boolean conversion**
        input_df['multi_screen'] = input_df['multi_screen'].astype(int)
        input_df['mail_subscribed'] = input_df['mail_subscribed'].astype(int)

        # Convert number fields
        number_columns = ['age', 'no_of_days_subscribed', 'weekly_mins_watched', 'customer_support_calls']
        for col in number_columns:
            if col in input_df.columns:
                input_df[col] = pd.to_numeric(input_df[col], errors='coerce')

        # 🔄 **Exact feature order from model**
        model_features = list(ott_model.feature_names_in_)
        print("🗂️ Expected feature order from model:", model_features)

        # 📌 **Reorder the DataFrame**
        for feature in model_features:
            if feature not in input_df.columns:
                input_df[feature] = 0

        # Ensure the DataFrame is in the correct order
        input_df = input_df[model_features]

        # 🛠️ **Debugging Logs**
        print(f"🔎 Final DataFrame for OTT Prediction:\n{input_df}")
        print(f"🛠️ DataFrame Types:\n{input_df.dtypes}")

        # Prediction
        prediction = ott_model.predict(input_df)
        probability = ott_model.predict_proba(input_df)[0][1]

        # Prepare response
        response = {
            'modelType': 'OTT',
            'prediction': int(prediction[0]),
            'probability': float(probability * 100)  # ✅ Convert to float
        }

        print(f"✅ OTT Prediction result: {response}")
        return jsonify(response)

    except Exception as e:
        print(f"❌ Error during OTT prediction: {e}")
        return jsonify({'error': str(e)}), 500


# 📌 **Endpoint for Bank Prediction**
@app.route('/predict-bank', methods=['POST'])
def predict_bank():
    try:
        # Receive Data
        data = request.json
        print(f"📥 Received Bank input: {data}")
        
        # Fill missing fields with defaults
        data.setdefault('hascrcard', 0)
        data.setdefault('isactivemember', 0)

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        # 🔄 **Apply label encoding for categorical**
        if 'gender' in input_df.columns:
            input_df['gender'] = pd.to_numeric(input_df['gender'], errors='coerce')
        if 'geography' in input_df.columns:
            input_df['geography'] = pd.to_numeric(input_df['geography'], errors='coerce')

        # Convert number fields
        number_columns = [
            'creditscore', 'age', 'tenure', 'balance', 'numofproducts',
            'hascrcard', 'isactivemember', 'estimatedsalary'
        ]
        
        for col in number_columns:
            if col in input_df.columns:
                input_df[col] = pd.to_numeric(input_df[col], errors='coerce')

        # 🔄 **Exact feature order from model**
        model_features = list(bank_model.feature_names_in_)
        print("🗂️ Expected feature order from model:", model_features)

        # 📌 **Reorder the DataFrame**
        for feature in model_features:
            if feature not in input_df.columns:
                input_df[feature] = 0

        # Ensure the DataFrame is in the correct order
        input_df = input_df[model_features]

        # 🛠️ **Debugging Logs**
        print(f"🔎 Final DataFrame for Bank Prediction:\n{input_df}")
        print(f"🛠️ DataFrame Types:\n{input_df.dtypes}")

        # Prediction
        prediction = bank_model.predict(input_df)
        probability = bank_model.predict_proba(input_df)[0][1]

        # Prepare response
        response = {
            'modelType': 'Banking',
            'prediction': int(prediction[0]),
            'probability': float(probability * 100)  # ✅ Convert to float
        }

        print(f"✅ Bank Prediction result: {response}")
        return jsonify(response)

    except Exception as e:
        print(f"❌ Error during Bank prediction: {e}")
        return jsonify({'error': str(e)}), 500


# Start the Flask app
if __name__ == '__main__':
    print("🚀 Starting Flask Server...")
    app.run(port=5000, debug=True)
