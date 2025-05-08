import pandas as pd
from sklearn.preprocessing import LabelEncoder
from tkinter import Tk, filedialog
import joblib

def upload_file():
    """Open a file dialog to upload the OTT dataset."""
    Tk().withdraw()  # Hide the root Tkinter window
    file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
    
    if file_path:
        print(f"\n✅ File Selected: {file_path}")
        return file_path
    else:
        print("\n❌ No file selected. Please try again.")
        exit()

# Step 1: Upload
file_path = upload_file()

# Step 2: Load
df = pd.read_csv(file_path)
print("\n📂 OTT Dataset Loaded Successfully!\n")

# Step 3: Handle Missing Values
df['gender'].fillna(df['gender'].mode()[0], inplace=True)
df['maximum_days_inactive'].fillna(df['maximum_days_inactive'].median(), inplace=True)
df.dropna(subset=['churn'], inplace=True)
numerical_cols = df.select_dtypes(include=['number']).columns
df[numerical_cols] = df[numerical_cols].fillna(df[numerical_cols].median())
print("\n🩹 Missing values handled!")

# Step 4: Remove Negative Values
invalid_data_cols = [col for col in numerical_cols if col not in ['customer_id', 'phone_no', 'year']]
for col in invalid_data_cols:
    df = df[df[col] >= 0]
print("\n🧹 Invalid values removed (no negative values in numerical columns)!")

# Step 5: Encode Categorical Columns
categorical_cols = ['gender', 'multi_screen', 'mail_subscribed']
for col in categorical_cols:
    if col in df.columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
print("\n🔢 Categorical variables encoded!")

# Step 6: Save Outputs
csv_output = "preprocessed_ott.csv"
pkl_output = "preprocessed_ott.pkl"
df.to_csv(csv_output, index=False)
joblib.dump(df, pkl_output)

print(f"\n💾 Preprocessed OTT dataset saved as:\n- CSV: {csv_output}\n- Pickle: {pkl_output}")

# Step 7: Preview
print("\n📊 First 5 rows of Preprocessed Dataset:")
print(df.head())
