import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Custom hook for typing animation
function useTypingAnimation(text, delay = 80) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    setIsTyping(true);
    setDisplayedText('');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return { displayedText, isTyping };
}

export default function Generate() {
  const navigate = useNavigate();
  const [userPrompt, setUserPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const { displayedText, isTyping } = useTypingAnimation(currentResponse, 50);
  const messagesEndRef = useRef(null);



  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, displayedText]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleChat = async () => {
    if (!userPrompt.trim()) return;
  
    const newUserMessage = {
      role: 'user',
      content: userPrompt
    };
  
    setMessages((prev) => [...prev, newUserMessage]);
    setUserPrompt('');
    setIsGenerating(true);
    setCurrentResponse('');
    setError('');
  
    try {
      const token = localStorage.getItem("token");
  
      // ✅ Use POST request with body
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/genSuggest/postPrompt`,  // Correct route for generation
        { userPrompt },   // Send the prompt in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
          },
          withCredentials: true  
        }
      );
  
      if (response.status === 200) {
        const backendResponse = response.data.response;  // Extract response from backend
        setCurrentResponse(backendResponse);
  
        // ✅ Display the response after typing
        const checkTypingComplete = setInterval(() => {
          if (!isTyping) {
            setMessages((prev) => [
              ...prev,
              { role: 'assistant', content: backendResponse }
            ]);
            setCurrentResponse('');
            setIsGenerating(false);
            clearInterval(checkTypingComplete);
          }
        }, 100);
      } else {
        throw new Error('Failed to get a valid response');
      }
    } catch (error) {
      console.error('Error fetching from backend:', error);
      setError('Failed to fetch response. Please try again.');
      setIsGenerating(false);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userPrompt.trim() || isGenerating) return;
    handleChat();
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a] flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 h-16">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Legal Chatbot
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          {messages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-center">
              <div>
                <h2 className="text-lg font-semibold text-white">How can I help you today?</h2>
                <p className="text-gray-400 mt-1">Ask me anything about legal matters</p>
              </div>
            </div>
          ) : (
            messages.map((message, idx) => (
              <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}

          {/* Typing Animation */}
          {currentResponse && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 max-w-[80%] rounded-lg p-4">
                <p className="whitespace-pre-wrap">
                  {displayedText}
                  {isTyping && <span className="ml-1 animate-pulse">|</span>}
                </p>
              </div>
            </div>
          )}

          {/* Loading animation */}
          {isGenerating && !currentResponse && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg p-4 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <footer className="border-t border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Ask a legal question..."
            className="flex-1 bg-gray-700 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none"
          />
          <button type="submit" disabled={!userPrompt.trim() || isGenerating} className="text-blue-500 hover:text-blue-400">
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
