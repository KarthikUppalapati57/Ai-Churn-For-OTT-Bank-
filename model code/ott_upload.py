import pandas as pd
import os

# Replace with your dataset filename
DATASET_PATH = "C:/Users/ukart/OneDrive - University of Tennessee/M/2nd_sem/Adv_Software/Final_Project/Ott/ott_churn_model_dataset.csv"

if os.path.exists(DATASET_PATH):
    print("✅ File Found:", DATASET_PATH)
    # Load the CSV into DataFrame
    df = pd.read_csv(DATASET_PATH)
    
    # Show basic structure
    print("\n📊 Dataset Preview:")
    print(df.head())

    print("\n🔍 Column Info:")
    print(df.info())

    print("\n🧼 Null Values:")
    print(df.isnull().sum())
else:
    print("❌ File not found. Please make sure the OTT.csv file is in the same folder.")
