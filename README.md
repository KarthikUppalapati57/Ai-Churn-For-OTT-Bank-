# Ai-Churn-For-OTT&Bank-
# Churn Prediction Dashboard

This project is a fully interactive **Churn Prediction Dashboard** that allows real-time predictions and data analysis for both **OTT Platforms** and **Banking Services**. It is powered by **RandomForestClassifier** models, and the predictions are visualized using an interactive web-based application.

---

## 📌 **Project Structure**

```
project-root/
│
├── backend/
│   ├── app.py                   # Flask API for prediction
│   ├── dashboard_data.py        # Data preparation for dashboard visualization
│   ├── ott_churn_model.pkl      # OTT model
│   ├── bank_churn_model.pkl     # Bank model
│   ├── ott_label_encoders.pkl   # OTT encoders
│   ├── bank_label_encoders.pkl  # Bank encoders
│   └── data/
│       ├── preprocessed_ott.csv
│       └── preprocessed_bank.csv
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/         # Dashboard components
│   │   │   ├── customers/         # Customer insights
│   │   │   └── predictions/       # Prediction forms
│   │   ├── services/
│   │   │   ├── dashboardService.ts
│   │   │   └── predictionService.ts
│   │   └── pages/
│   ├── App.tsx                   # Main Application Entry
│   └── index.tsx                 # Application Renderer
│
└── README.md
```

---

## 🚀 **Setup Instructions**

### **Backend Setup**
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask application:
   ```bash
   python app.py
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```

4. The application will be running at:
   ```
http://localhost:5173
   ```

---

## 📊 **Dashboard Features**
- **Real-time Churn Forecasting** for OTT and Banking datasets.
- **Interactive Prediction Forms** to input customer data.
- **Segment Analysis** to visualize high-risk and low-risk churn groups.
- **Historical Trend Analysis** to study churn patterns over time.
- **Risk Assessment Heatmaps** to identify regions with higher churn rates.

---

## 🛠️ **Technologies Used**
- **Frontend:** React.js, TypeScript, TailwindCSS
- **Backend:** Flask, Python, Pandas
- **Machine Learning Model:** RandomForestClassifier
- **Deployment:** Docker (planned)

---

## ✅ **Future Work**
- Integrate real-time feedback loop for continuous model learning.
- Expand dashboard capabilities for deeper insights.
- Deploy using Docker for scalable microservices architecture.

---

## 🤝 **Contributions**
Contributions are welcome! Please fork the repository and submit a pull request for review.

---

## 📄 **License**
This project is licensed under the MIT License.

---
