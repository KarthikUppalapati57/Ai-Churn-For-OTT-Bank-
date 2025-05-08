import pandas as pd
from sklearn.preprocessing import LabelEncoder
from tkinter import Tk, filedialog

def upload_file():
    """Open a file dialog to upload the Bank dataset."""
    Tk().withdraw()  
    file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
    
    if file_path:
        print(f"\n✅ File Selected: {file_path}")
        return file_path
    else:
        print("\n❌ No file selected. Please try again.")
        exit()

file_path = upload_file()

# Load dataset
df = pd.read_csv(file_path)
print("\n📂 Bank Dataset Loaded!\n")


categorical_cols = ['Geography', 'Gender', 'Card Type']
for col in categorical_cols:
    if df[col].isnull().sum() > 0:
        df[col].fillna(df[col].mode()[0], inplace=True)

numerical_cols = df.select_dtypes(include=['number']).columns
df[numerical_cols] = df[numerical_cols].fillna(df[numerical_cols].median())

print("\n✅ Missing values handled!")

invalid_data_cols = [col for col in numerical_cols if col not in ['CustomerId', 'RowNumber']]
for col in invalid_data_cols:
    df = df[df[col] >= 0]  

print("\n✅ Invalid values removed (No negative values in numerical columns)!")


for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])

print("\n Categorical variables encoded!")

output_path = "preprocessed_bank.csv"
df.to_csv(output_path, index=False)
print(f"\n💾 Preprocessed Bank dataset saved as: {output_path}")

# Preview first 5 rows
print("\n First 5 rows of Preprocessed Dataset:")
print(df.head())
