import type { NextPage } from 'next';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  // Replace this with your actual AWS API Gateway URL
  const API_URL = 'https://fp8i1h5xsh.execute-api.us-east-2.amazonaws.com/prod/summarize';

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?]*)/,
      /(?:youtube\.com\/shorts\/)([^&\n?]*)/,
      /(?:youtube\.com\/embed\/)([^&\n?]*)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSummary('');

    if (!extractVideoId(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending request to:', API_URL);  // Debug log
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);  // Debug log
      setError(error instanceof Error ? error.message : 'Failed to process video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center">YouTube Video Summarizer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter YouTube URL"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Processing...' : 'Summarize'}
                  </button>
                </form>
              </div>
              
              {error && (
                <div className="py-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {loading && (
                <div className="py-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Processing video... This may take a few minutes.</p>
                </div>
              )}

              {summary && (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-2">Summary:</h3>
                  <div className="text-gray-600 whitespace-pre-line">{summary}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;