import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Add custom scrollbar styles
const scrollbarStyles = `
  /* Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 4px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #334155 transparent;
  }
`;

// Add style tag to head
const styleSheet = document.createElement("style");
styleSheet.innerText = scrollbarStyles;
document.head.appendChild(styleSheet);

// Custom hook for realistic chatbot typing animation
function useTypingAnimation(text) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
    setDisplayedText('');
    if (!text) return;

    setIsTyping(true);
    
    let currentIndex = 0;
    let currentWord = '';
    let isInWord = false;
    let lastCharWasSpace = false;
    let consecutiveWords = 0;

    const typeCharacter = () => {
      if (currentIndex >= text.length) {
        setIsTyping(false);
        return;
      }

      const char = text[currentIndex];
      
      // Handle different types of characters
      if (char === ' ') {
        // Add space with longer random delay
        setDisplayedText(prev => prev + ' ');
        currentIndex++;
        lastCharWasSpace = true;
        consecutiveWords++;
        
        // Longer delay between words, increases with consecutive words
        let delay = 800; // Base delay for spaces
        if (consecutiveWords >= 3) {
          delay += 1000; // Add extra delay after 3+ consecutive words
        }
        delay += Math.random() * 800; // Add random variation
        
        // Occasionally add a "thinking" pause (15% chance)
        if (Math.random() < 0.15) {
          delay += 2500;
        }
        
        setTimeout(typeCharacter, delay);
        
      } else if (char.match(/[.,!?;:]/)) {
        // Add punctuation with much longer delay
        setDisplayedText(prev => prev + char);
        currentIndex++;
        lastCharWasSpace = false;
        consecutiveWords = 0;
        
        // Much longer pause after punctuation
        let delay = 2000; // Base delay for punctuation
        if (char === '.' || char === '!' || char === '?') {
          delay = 3500; // Longer pause after sentence endings
        } else if (char === ',') {
          delay = 2500; // Medium pause after commas
        }
        
        // Add significant random variation
        delay += Math.random() * 2000;
        
        // Higher chance of "thinking" pause after punctuation (30% chance)
        if (Math.random() < 0.3) {
          delay += 3500;
        }
        
        setTimeout(typeCharacter, delay);
      } else {
        // Handle regular characters
        if (!isInWord) {
          isInWord = true;
          currentWord = '';
        }
        
        currentWord += char;
        setDisplayedText(prev => prev + char);
        currentIndex++;
        lastCharWasSpace = false;
        
        // Much slower typing speed based on character position in word
        let delay = 150; // Base typing speed
        if (currentWord.length === 1) {
          delay = 400; // Much slower at start of word
        } else if (currentWord.length === 2) {
          delay = 300; // Slightly faster for second character
        } else if (currentWord.length >= 4) {
          delay = 100; // Faster for middle of word
        }
        
        // Add more random variation
        delay += Math.random() * 200;
        
        // More frequent mid-word pauses (15% chance)
        if (Math.random() < 0.15) {
          delay += 800;
        }
        
        setTimeout(typeCharacter, delay);
      }
    };

    // Longer initial delay before starting (3 seconds)
    setTimeout(typeCharacter, 3000);

    return () => {
      setIsTyping(false);
    };
  }, [text]);

  return { displayedText, isTyping };
}

const ChatComponent = () => {
  const navigate = useNavigate();
  const [userPrompt, setUserPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { displayedText, isTyping } = useTypingAnimation(currentResponse);
  const messagesEndRef = React.useRef(null);
  const messagesContainerRef = React.useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = React.useState(true);

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, state, etc.)
    navigate('/login');
  };

  const scrollToBottom = () => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll events
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50;
      setShouldAutoScroll(isAtBottom);
    }
  };

  // Scroll to bottom when messages change or new text is displayed
  React.useEffect(() => {
    if (isGenerating || currentResponse) {
      scrollToBottom();
    }
  }, [messages, displayedText, isGenerating, currentResponse]);

  // Sample responses for demonstration
  const sampleResponses = [
    "I understand your legal concern. Based on the information provided, I can help guide you through the process. The key points to consider are the jurisdiction, applicable laws, and potential outcomes. Would you like me to elaborate on any specific aspect?",
    "In legal terms, this situation falls under several important categories. Let me break down the relevant legal principles and precedents that apply to your case. The primary considerations include statutory requirements, case law, and procedural rules.",
    "This is an interesting legal question that requires careful analysis. The applicable laws in this context are complex and multifaceted. Let me explain the key legal concepts and how they relate to your situation.",
    "Based on current legal precedents and statutory requirements, there are several important factors to consider. The legal framework governing this matter involves multiple layers of regulation and interpretation.",
    "I can help you understand the legal implications of your situation. The relevant laws and regulations provide specific guidelines and requirements that must be followed. Let me explain the key points you need to know."
  ];

  const handleChat = async () => {
    if (!userPrompt.trim()) return;

    const newUserMessage = {
      role: 'user',
      content: userPrompt
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserPrompt('');
    
    setIsGenerating(true);
    setCurrentResponse('');

    // Simulate API delay
    setTimeout(() => {
      // Get a random sample response
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setCurrentResponse(randomResponse);
      
      // After typing animation completes, add to messages
      const checkTypingComplete = setInterval(() => {
        if (!isTyping) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: randomResponse
          }]);
          setCurrentResponse('');
          setIsGenerating(false);
          clearInterval(checkTypingComplete);
        }
      }, 100);
    }, 1000);
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 hover:overflow-y-auto transition-all duration-200"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">How can I help you today?</h2>
                    <p className="text-gray-400 mt-1">Ask me anything about legal matters</p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Current Response with Typing Animation */}
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
                </>
              )}
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
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-700 p-4">
              <form onSubmit={(e) => { e.preventDefault(); handleChat(); }} className="max-w-4xl mx-auto relative">
                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Ask a legal question..."
                  className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!userPrompt.trim() || isGenerating}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent; 