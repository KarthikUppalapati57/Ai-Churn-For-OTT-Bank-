import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder
import joblib

# Load preprocessed Bank dataset
file_path = "preprocessed_bank.csv"
df = pd.read_csv(file_path)
print("\n✅ Preprocessed Bank Dataset Loaded!\n")

# Clean column names
df.columns = df.columns.str.strip()
df.columns = df.columns.str.lower()
print("Columns found in the dataset:", df.columns)

# Initialize encoders for categorical features
geography_encoder = LabelEncoder()
gender_encoder = LabelEncoder()

# Apply label encoding
if 'geography' in df.columns:
    df['geography'] = geography_encoder.fit_transform(df['geography'])
if 'gender' in df.columns:
    df['gender'] = gender_encoder.fit_transform(df['gender'])

# Define Features (X) and Target (y)
X = df[['creditscore', 'geography', 'gender', 'age', 'tenure',
        'balance', 'numofproducts', 'hascrcard', 'isactivemember', 'estimatedsalary']]
y = df['exited']

# Split dataset into Training (80%) and Testing (20%) sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("\n✅ Bank Model Training Completed!")

# Make Predictions on Test Data
y_pred = model.predict(X_test)

# Evaluate the Model
accuracy = accuracy_score(y_test, y_pred)
print(f"\n📈 Model Accuracy: {accuracy * 100:.2f}%")
print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

# Save the trained model and encoders
joblib.dump(model, "bank_churn_model.pkl")
joblib.dump({
    'Geography': geography_encoder,
    'Gender': gender_encoder
}, 'bank_label_encoders.pkl')

print("\n💾 Model and encoders saved as: bank_churn_model.pkl & bank_label_encoders.pkl")
