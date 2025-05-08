import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder
import joblib

# Load preprocessed OTT dataset
file_path = "preprocessed_ott.csv"
df = pd.read_csv(file_path)
print("\n✅ Preprocessed OTT Dataset Loaded!\n")

# Clean column names (in case there are spaces or capitalization issues)
df.columns = df.columns.str.strip()
df.columns = df.columns.str.lower()
print("Columns found in the dataset:", df.columns)

# Initialize encoders for categorical features
gender_encoder = LabelEncoder()

# Apply label encoding
if 'gender' in df.columns:
    df['gender'] = gender_encoder.fit_transform(df['gender'])

# Define Features (X) and Target (y)
X = df[['gender', 'age', 'no_of_days_subscribed', 'multi_screen',
        'mail_subscribed', 'weekly_mins_watched', 'customer_support_calls']]
y = df['churn']

# Split dataset into Training (80%) and Testing (20%) sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Machine Learning Model (Random Forest)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("\n✅ OTT Model Training Completed!")

# Make Predictions on Test Data
y_pred = model.predict(X_test)

# Evaluate the Model
accuracy = accuracy_score(y_test, y_pred)
print(f"\n📈 Model Accuracy: {accuracy * 100:.2f}%")
print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

# Save the trained model and encoders
joblib.dump(model, "ott_churn_model.pkl")
joblib.dump({
    'Gender': gender_encoder,
}, 'ott_label_encoders.pkl')

print("\n💾 Model and encoders saved as: ott_churn_model.pkl & ott_label_encoders.pkl")
