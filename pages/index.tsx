import type { NextPage } from 'next';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  // Make sure this is your actual AWS API Gateway URL
  const API_URL = 'https://fp8i1h5xsh.execute-api.us-east-2.amazonaws.com/prod/summarize';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting URL:', url); // Debug log
    setLoading(true);
    
    try {
      console.log('Making fetch request to:', API_URL); // Debug log
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      console.log('Response received:', response); // Debug log

      const data = await response.json();
      console.log('Data received:', data); // Debug log
      setSummary(data.summary);
    } catch (error) {
      console.error('Error occurred:', error); // Debug log
      setError(error instanceof Error ? error.message : 'Failed to process video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-2xl font-bold mb-6">YouTube Video Summarizer</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full p-2 border rounded mb-4"
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Summarize'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-4 text-center">
            Processing video... This may take a few minutes.
          </div>
        )}

        {summary && (
          <div className="mt-4">
            <h2 className="font-bold mb-2">Summary:</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;