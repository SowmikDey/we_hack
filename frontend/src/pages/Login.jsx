import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, formData)
      if (response.status === 200) {
        const data = response.data
        localStorage.setItem('token', data.token)
        navigate('/generate')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#080808] text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }
        .gold-text { background: linear-gradient(135deg, #d4a843 0%, #f5d78e 50%, #b8860b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #111 inset !important; -webkit-text-fill-color: #fff !important; }
        input:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0px 1000px #111 inset !important; }
        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.3;
        }
      `}</style>
      <div className="grain" />

      {/* Background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex w-full h-full">

        {/* ─── LEFT PANEL ─── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 border-r border-white/10"
        >
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 border border-amber-400/60 flex items-center justify-center">
              <span className="text-amber-400 text-xs">⚖</span>
            </div>
            <span className="text-white font-semibold tracking-widest text-sm uppercase">KnowYourRights</span>
          </Link>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="text-amber-400 text-xs tracking-[0.4em] uppercase block mb-6">Welcome Back</span>
              <h2 className="serif text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                Your Rights,<br /><em className="gold-text not-italic">Your Power.</em>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                Experience the power of AI-driven legal guidance. Sign in to continue your journey towards legal literacy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 space-y-4"
            >
              {[
                { dot: 'bg-amber-400', label: 'Real-time AI Guidance' },
                { dot: 'bg-emerald-400', label: 'Smart Legal Analysis' },
                { dot: 'bg-blue-400', label: 'Secure & Private Platform' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <span className={`w-1.5 h-1.5 ${item.dot} rounded-full animate-pulse`} />
                  <span className="text-gray-400 text-sm">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="text-gray-600 text-xs tracking-widest">© 2025 KnowYourRights</div>
        </motion.div>

        {/* ─── RIGHT PANEL ─── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden mb-10">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 border border-amber-400/60 flex items-center justify-center">
                  <span className="text-amber-400 text-xs">⚖</span>
                </div>
                <span className="text-white font-semibold tracking-widest text-sm uppercase">KnowYourRights</span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-amber-400 text-xs tracking-[0.4em] uppercase block mb-3">Access Your Account</span>
              <h1 className="serif text-4xl font-bold text-white mb-2">Sign In</h1>
              <p className="text-gray-500 text-sm mb-10">Welcome back. Enter your credentials to continue.</p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {[
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
              ].map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor={field.id} className="text-gray-400 text-xs tracking-widest uppercase">{field.label}</label>
                    {field.id === 'password' && (
                      <a href="#" className="text-amber-400/70 hover:text-amber-400 text-xs transition-colors duration-300">Forgot password?</a>
                    )}
                  </div>
                  <input
                    type={field.type}
                    name={field.id}
                    id={field.id}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3.5 bg-transparent border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/60 transition-colors duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3"
              >
                <input type="checkbox" id="remember" className="w-4 h-4 accent-amber-400" />
                <label htmlFor="remember" className="text-gray-500 text-sm">Remember me</label>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-amber-400 text-black font-bold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing In…
                    </span>
                  ) : 'Sign In →'}
                </span>
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center text-gray-600 text-sm mt-8"
            >
              Don't have an account?{' '}
              <Link to="/signup" className="text-amber-400 hover:text-amber-300 transition-colors duration-300">Create one</Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}