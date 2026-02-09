// src/api/gate.js
export const predictGATE = async (payload) => {
    const res = await fetch('http://localhost:5000/api/gate/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('GATE prediction failed');
    return res.json();
  };
  