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
  const [fetchchat, setFetchChat] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isFetchingLatest, setIsFetchingLatest] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Fetch chat history
  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/genSuggest/fetchdata`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        setFetchChat(response.data);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError("Failed to load chat history.");
    } finally {
      setIsLoadingHistory(false);
      setIsFetchingLatest(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  // ✅ Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, displayedText, fetchchat]);

  const handleLogout = () => {
    navigate('/');
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

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/genSuggest/postPrompt`,
        { userPrompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        const backendResponse = response.data.response;
        setCurrentResponse(backendResponse);

        const checkTypingComplete = setInterval(() => {
          if (!isTyping) {
            setMessages((prev) => [
              ...prev,
              { role: 'assistant', content: backendResponse }
            ]);
            setCurrentResponse('');
            setIsGenerating(false);
            clearInterval(checkTypingComplete);

            // ✅ Fetch latest chat history immediately after posting
            setIsFetchingLatest(true);
            fetchChatHistory();
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "calc(100vh - 160px)" }}>

          {/* ✅ Loading spinner for fetching latest chats */}
          {isFetchingLatest && (
            <div className="text-center text-gray-400">Updating chat history...</div>
          )}

          {/* ✅ No Messages Fallback */}
          {isLoadingHistory ? (
            <div className="text-center text-gray-400">Loading chat history...</div>
          ) : fetchchat.length === 0 ? (
            <div className="flex justify-center items-center h-full text-center">
              <div>
                <h2 className="text-lg font-semibold text-white">How can I help you today?</h2>
                <p className="text-gray-400 mt-1">Ask me anything about legal matters</p>
              </div>
            </div>
          ) : (
            fetchchat.map((chat, idx) => (
              <div key={idx} className="space-y-2">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white max-w-[70%] rounded-lg p-4">
                    <p>{chat.prompt}</p>
                  </div>
                </div>

                {/* AI message */}
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 max-w-[70%] rounded-lg p-4">
                    <p>{chat.response}</p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Scroll anchor */}
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
