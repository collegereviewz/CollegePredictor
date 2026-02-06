// src/api/wbjee.js
export const predictWBJEE = async (payload) => {
    const res = await fetch('http://localhost:5000/api/wbjee/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('WBJEE prediction failed');
    return res.json();
  };
  