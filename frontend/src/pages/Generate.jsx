import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function useTypingAnimation(text, delay = 30) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!text) {
      setDisplayedText('')
      setIsTyping(false)
      return
    }
    setIsTyping(true)
    setDisplayedText('')
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex])
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [text, delay])

  return { displayedText, isTyping }
}

function ChatBubble({ role, content, animate = false }) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 border border-amber-400/60 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
          <span className="text-amber-400 text-xs">⚖</span>
        </div>
      )}
      <div
        className={`max-w-[72%] px-5 py-4 text-sm leading-relaxed ${
          isUser
            ? 'bg-amber-400 text-black font-medium'
            : 'border border-white/10 text-gray-200'
        }`}
        style={isUser ? {} : { background: 'rgba(255,255,255,0.04)' }}
      >
        {content}
      </div>
      {isUser && (
        <div className="w-7 h-7 bg-amber-400/20 border border-amber-400/40 flex items-center justify-center ml-3 mt-1 flex-shrink-0">
          <span className="text-amber-400 text-xs font-bold">U</span>
        </div>
      )}
    </motion.div>
  )
}

export default function Generate() {
  const navigate = useNavigate()
  const [userPrompt, setUserPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [currentResponse, setCurrentResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const { displayedText, isTyping } = useTypingAnimation(currentResponse, 18)
  const [fetchchat, setFetchChat] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const messagesEndRef = useRef(null)
  const isTypingRef = useRef(isTyping)

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/genSuggest/fetchdata`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      )
      if (response.status === 200) setFetchChat(response.data)
    } catch (error) {
      setError('Failed to load chat history.')
    } finally {
      setIsLoadingHistory(false)
    }
  }

  useEffect(() => { fetchChatHistory() }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, displayedText, fetchchat])

  useEffect(() => {
    isTypingRef.current = isTyping
  }, [isTyping])

  const handleChat = async () => {
    if (!userPrompt.trim()) return
    const newUserMessage = { role: 'user', content: userPrompt }
    setMessages((prev) => [...prev, newUserMessage])
    setUserPrompt('')
    setIsGenerating(true)
    setCurrentResponse('')
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/genSuggest/postPrompt`,
        { userPrompt },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, withCredentials: true }
      )
      if (response.status === 200) {
        const backendResponse = response.data.response
        setCurrentResponse(backendResponse)
        const checkTypingComplete = setInterval(() => {
          if (!isTypingRef.current) {
            setMessages((prev) => [...prev, { role: 'assistant', content: backendResponse }])
            setCurrentResponse('')
            setIsGenerating(false)
            clearInterval(checkTypingComplete)
          }
        }, 100)
      }
    } catch (error) {
      setError('Failed to fetch response. Please try again.')
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userPrompt.trim() || isGenerating) return
    handleChat()
  }

  const isEmpty = !isLoadingHistory && fetchchat.length === 0 && messages.length === 0

  return (
    <div className="fixed inset-0 bg-[#080808] text-white flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }
        .gold-text { background: linear-gradient(135deg, #d4a843 0%, #f5d78e 50%, #b8860b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.3); border-radius: 2px; }
      `}</style>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* ─── HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 border-b border-white/10 flex items-center justify-between px-6 md:px-10 h-16"
        style={{ backdropFilter: 'blur(20px)', background: 'rgba(8,8,8,0.9)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-amber-400/60 flex items-center justify-center">
            <span className="text-amber-400 text-xs">⚖</span>
          </div>
          <span className="text-white font-semibold tracking-widest text-sm uppercase hidden sm:block">KnowYourRights</span>
          <span className="hidden md:block w-px h-5 bg-white/10 mx-2" />
          <span className="text-gray-500 text-xs tracking-widest hidden md:block">Legal AI Assistant</span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 text-xs tracking-widest uppercase transition-all duration-300"
        >
          ← Logout
        </button>
      </motion.header>

      {/* ─── CHAT AREA ─── */}
      <div className="flex-1 overflow-y-auto relative z-10" style={{ maxHeight: 'calc(100vh - 130px)' }}>
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {/* Empty state */}
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center min-h-[50vh] text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 border border-amber-400/30 flex items-center justify-center mb-8"
                >
                  <span className="text-amber-400 text-2xl">⚖</span>
                </motion.div>
                <h2 className="serif text-3xl font-bold text-white mb-3">How Can I Help You?</h2>
                <p className="text-gray-500 text-sm max-w-sm">Ask me anything about your legal rights, obligations, or concerns. I'm here to make law accessible.</p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                  {[
                    'What are my tenant rights?',
                    'How do I file a complaint?',
                    'What is habeas corpus?',
                    'Explain my consumer rights',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => { setUserPrompt(suggestion) }}
                      className="px-4 py-3 border border-white/10 text-gray-400 hover:border-amber-400/40 hover:text-white text-xs text-left tracking-wide transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                      {suggestion} →
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading */}
          {isLoadingHistory && (
            <div className="flex items-center justify-center gap-3 py-10 text-gray-600 text-sm tracking-widest">
              <svg className="animate-spin w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading history…
            </div>
          )}

          {/* History */}
          {!isLoadingHistory && fetchchat.map((chat, idx) => (
            <React.Fragment key={idx}>
              <ChatBubble role="user" content={chat.prompt} />
              <ChatBubble role="assistant" content={chat.response} />
            </React.Fragment>
          ))}

          {/* Live session messages */}
          {messages.map((msg, idx) => (
            <ChatBubble key={`live-${idx}`} role={msg.role} content={msg.content} />
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {displayedText && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="w-7 h-7 border border-amber-400/60 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-amber-400 text-xs">⚖</span>
                </div>
                <div
                  className="max-w-[72%] px-5 py-4 text-sm leading-relaxed border border-white/10 text-gray-200"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {displayedText}
                  {isTyping && <span className="inline-block w-0.5 h-4 bg-amber-400 ml-1 animate-pulse" />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thinking dots */}
          <AnimatePresence>
            {isGenerating && !displayedText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start items-center gap-3"
              >
                <div className="w-7 h-7 border border-amber-400/60 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-xs">⚖</span>
                </div>
                <div className="flex gap-1.5 px-5 py-4 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="text-red-400 text-xs text-center py-2 border border-red-500/20 bg-red-500/5">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ─── INPUT ─── */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 border-t border-white/10 px-4 py-4"
        style={{ backdropFilter: 'blur(20px)', background: 'rgba(8,8,8,0.9)' }}
      >
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Ask a legal question…"
            className="flex-1 px-5 py-3.5 bg-transparent border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 transition-colors duration-300"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          />
          <button
            type="submit"
            disabled={!userPrompt.trim() || isGenerating}
            className="px-6 py-3.5 bg-amber-400 text-black font-bold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : '→'}
          </button>
        </form>
        <p className="text-gray-700 text-xs text-center mt-2 tracking-wider">AI guidance is not a substitute for professional legal advice.</p>
      </motion.footer>
    </div>
  )
}
