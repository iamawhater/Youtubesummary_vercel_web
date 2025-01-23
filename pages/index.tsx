import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Youtube } from 'lucide-react';

const Home: NextPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'https://fp8i1h5xsh.execute-api.us-east-2.amazonaws.com/prod/summarize';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSummary('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      setSummary('This is a sample summary of the video. Currently, the backend is not connected.');
    } catch (error) {
      setError('Failed to process video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Youtube size={64} className="text-red-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            YouTube Summarizer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get quick, AI-powered summaries of any YouTube video. Save time and get the key points instantly.
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here..."
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Processing Video...
                </div>
              ) : (
                'Summarize Video'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {summary && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold text-purple-400">Video Summary</h2>
              <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {summary}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quick Summaries',
              description: 'Get concise summaries of long videos in seconds.',
              icon: '⚡'
            },
            {
              title: 'Key Points',
              description: 'Extract the most important information without watching.',
              icon: '🎯'
            },
            {
              title: 'Time Saver',
              description: 'Make informed decisions about which videos to watch fully.',
              icon: '⏰'
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;