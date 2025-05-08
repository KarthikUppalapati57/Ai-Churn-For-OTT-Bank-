import axios from 'axios';

const API_URL = "http://127.0.0.1:5000/api/dashboard";

export const getOttDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ott`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching OTT Dashboard Data:", error);
    throw error;
  }
};

export const getBankDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/bank`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching Bank Dashboard Data:", error);
    throw error;
  }
};
