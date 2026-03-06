import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, formData)
      if (response.status === 201) navigate('/login')
    } catch (err) {
      setError('Error creating account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }
        .gold-text { background: linear-gradient(135deg, #d4a843 0%, #f5d78e 50%, #b8860b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #111 inset !important; -webkit-text-fill-color: #fff !important; }
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
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Glow */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)' }}
      />

      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex justify-between items-center px-8 md:px-16 py-6 border-b border-white/10"
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-amber-400/60 flex items-center justify-center">
            <span className="text-amber-400 text-xs">⚖</span>
          </div>
          <span className="text-white font-semibold tracking-widest text-sm uppercase">KnowYourRights</span>
        </Link>
        <Link to="/login" className="text-gray-500 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300">
          Sign In →
        </Link>
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-8 py-16">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <span className="text-amber-400 text-xs tracking-[0.4em] uppercase block mb-4">Join the Platform</span>
            <h1 className="serif text-5xl font-bold text-white mb-3">
              Create Your <em className="gold-text not-italic">Account</em>
            </h1>
            <p className="text-gray-500 text-sm">Start your journey towards legal empowerment today.</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <label className="text-gray-400 text-xs tracking-widest uppercase block mb-2">{field.label}</label>
                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  type={field.type}
                  required
                  className="w-full px-4 py-3.5 bg-transparent border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/60 transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                />
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-amber-400 text-black font-bold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account…
                </span>
              ) : 'Create Account →'}
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-600 text-sm mt-8"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors duration-300">Sign in</Link>
          </motion.p>

          {/* Decorative dots */}
          <div className="absolute -bottom-8 -left-8 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}