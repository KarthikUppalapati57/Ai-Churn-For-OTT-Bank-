const API_URL = 'http://localhost:5000';

export async function getPrediction(industry: string, input: any) {
  const endpoint = industry === 'Banking' ? '/predict-bank' : '/predict-ott';
  
  console.log(`Sending data to ${endpoint}:`, input);

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    console.error("Failed to get prediction:", response.statusText);
    throw new Error('Prediction failed');
  }

  const data = await response.json();
  console.log("Prediction result:", data);
  return data;
}
