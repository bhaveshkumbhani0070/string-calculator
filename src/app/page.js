'use client';

import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`/api/add?numbers=${encodeURIComponent(input)}`);
      const data = await response.json();
      
      if (response.ok) {
        setResult(data.sum);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter numbers"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>
      {result !== null && (
        <p className="mt-4 text-green-500">Sum: {result}</p>
      )}
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  </div>
  );
}
