import pandas as pd
import joblib

# Load Datasets
print("🔄 Loading OTT and Bank datasets...")
ott_data = pd.read_csv('preprocessed_ott.csv')
bank_data = pd.read_csv('preprocessed_bank.csv')
print("✅ Datasets loaded successfully!")

# 📌 **OTT Analysis**
ott_insights = {
    "churn_rate": round(ott_data['churn'].mean() * 100, 2),
    "active_subscribers": len(ott_data[ott_data['churn'] == 0]),
    "total_subscribers": len(ott_data),
    "support_tickets_avg": round(ott_data['customer_support_calls'].mean(), 2),
    "gender_distribution": ott_data['gender'].value_counts(normalize=True).to_dict(),
    "age_distribution": ott_data['age'].value_counts().to_dict()
}

# 📌 **Bank Analysis**
bank_insights = {
    "churn_rate": round(bank_data['Exited'].mean() * 100, 2),     # Corrected column name
    "active_customers": len(bank_data[bank_data['Exited'] == 0]), # Corrected column name
    "total_customers": len(bank_data),
    "product_distribution": bank_data['NumOfProducts'].value_counts().to_dict(),
    "geography_distribution": bank_data['Geography'].value_counts(normalize=True).to_dict(),
    "gender_distribution": bank_data['Gender'].value_counts(normalize=True).to_dict(),
}

# 🔄 **Save Insights**
joblib.dump(ott_insights, 'ott_dashboard_data.pkl')
joblib.dump(bank_insights, 'bank_dashboard_data.pkl')
print("✅ Dashboard data prepared and saved!")
