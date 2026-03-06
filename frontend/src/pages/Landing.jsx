import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

const features = [
  {
    number: '01',
    title: 'Legal Awareness',
    desc: 'Learn it, understand it, apply it. Access easy-to-understand legal resources and make confident decisions.',
    icon: '⚖️',
  },
  {
    number: '02',
    title: 'Legal Empowerment',
    desc: 'Safeguard your rights, stay informed, and ensure compliance with structured guidance tailored for you.',
    icon: '🛡️',
  },
  {
    number: '03',
    title: 'Legal Compliance',
    desc: 'A secure and reliable platform designed to simplify legal processes and protect your rights with confidence.',
    icon: '📜',
  },
  {
    number: '04',
    title: 'Legal Solutions',
    desc: 'Create a seamless legal experience with collaborative resources and expert insights to empower individuals.',
    icon: '💡',
  },
  {
    number: '05',
    title: 'Legal Operations',
    desc: 'Ensure smooth legal processes with structured workflows, compliance tools, and expert resources.',
    icon: '🔍',
  },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative border border-white/10 p-8 hover:border-amber-400/50 transition-all duration-500 cursor-default"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-5xl font-serif text-amber-400/20 group-hover:text-amber-400/40 transition-colors duration-500 font-bold leading-none">{feature.number}</span>
          <span className="text-3xl">{feature.icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">{feature.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-amber-400 to-transparent group-hover:w-full transition-all duration-700" />
    </motion.div>
  )
}

export default function Landing() {
  const nextSectionRef = useRef(null)
  const middleSectionRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [menuOpen, setMenuOpen] = useState(false)

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }
        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.3;
        }
        .gold-text { background: linear-gradient(135deg, #d4a843 0%, #f5d78e 50%, #b8860b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .line-clamp { overflow: hidden; }
      `}</style>
      <div className="grain" />

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
        style={{ backdropFilter: 'blur(20px)', background: 'rgba(8,8,8,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-amber-400/60 flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300">
            <span className="text-amber-400 text-xs">⚖</span>
          </div>
          <span className="text-white font-semibold tracking-widest text-sm uppercase">KnowYourRights</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Home', to: '/' },
            { label: 'Features', onClick: (e) => { e.preventDefault(); middleSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) } },
            { label: 'Contact', onClick: (e) => { e.preventDefault(); nextSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) } },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to || '#'}
              onClick={item.onClick}
              className="text-gray-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white text-sm tracking-wider transition-colors duration-300">Sign In</Link>
          <Link to="/signup" className="px-6 py-2.5 text-sm tracking-widest uppercase font-medium text-black bg-amber-400 hover:bg-amber-300 transition-all duration-300">
            Get Started
          </Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0f0f0f] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            <Link to="/" className="text-white text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Home</Link>
            <button className="text-gray-400 text-sm tracking-widest uppercase text-left" onClick={() => { setMenuOpen(false); middleSectionRef.current?.scrollIntoView({ behavior: 'smooth' }) }}>Features</button>
            <button className="text-gray-400 text-sm tracking-widest uppercase text-left" onClick={() => { setMenuOpen(false); nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' }) }}>Contact</button>
            <Link to="/login" className="text-gray-400 text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link to="/signup" className="inline-block px-6 py-3 bg-amber-400 text-black text-sm font-semibold tracking-widest uppercase text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(100,120,255,0.15) 0%, transparent 70%)' }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-3 border border-amber-400/30 px-5 py-2 mb-10"
          >
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">AI-Powered Legal Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="serif text-6xl md:text-8xl xl:text-9xl font-bold leading-none mb-8 tracking-tight"
          >
            <span className="text-white block">Know Your</span>
            <span className="gold-text italic block">Rights.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light"
          >
            Our platform leverages cutting-edge AI to bridge the legal knowledge gap—making justice accessible, understandable, and actionable for everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-amber-400 text-black font-semibold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all duration-300"
            >
              Begin Your Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >→</motion.span>
            </Link>
            <button
              onClick={() => middleSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white text-sm tracking-widest uppercase hover:border-white/50 transition-all duration-300"
            >
              Explore Features
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-amber-400/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section ref={statsRef} className="py-24 px-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 50000, suffix: '+', label: 'Citizens Helped' },
            { value: 98, suffix: '%', label: 'Accuracy Rate' },
            { value: 200, suffix: '+', label: 'Legal Topics' },
            { value: 24, suffix: '/7', label: 'AI Availability' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="serif text-5xl md:text-6xl font-bold gold-text mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-xs tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── COMMUNITY BANNER ─── */}
      <section className="py-20 overflow-hidden relative">
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-400 text-xs tracking-[0.4em] uppercase"
          >Our Community</motion.span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="serif text-4xl md:text-6xl font-bold text-center text-white max-w-3xl mx-auto px-6 leading-tight"
        >
          Join a Community That <em className="gold-text not-italic">Empowers You</em>
        </motion.h2>

        {/* Scrolling ticker */}
        <div className="mt-16 relative">
          <div className="absolute inset-y-0 left-0 w-32 z-10" style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-32 z-10" style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 whitespace-nowrap"
          >
            {['Legal Awareness', 'Your Rights', 'AI Justice', 'Know Your Law', 'Empowered Citizens', 'Legal Clarity', 'Justice For All', 'AI-Powered Law'].concat(['Legal Awareness', 'Your Rights', 'AI Justice', 'Know Your Law', 'Empowered Citizens', 'Legal Clarity', 'Justice For All', 'AI-Powered Law']).map((t, i) => (
              <span key={i} className={`serif text-3xl font-bold ${i % 3 === 1 ? 'text-amber-400' : 'text-white/20'} italic`}>{t} •</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section ref={middleSectionRef} id="Us" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-amber-400 text-xs tracking-[0.4em] uppercase block mb-4"
              >What We Offer</motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="serif text-5xl md:text-6xl font-bold text-white leading-tight max-w-lg"
              >
                Empowering Citizens Through <em className="gold-text not-italic">Knowledge</em>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-400 max-w-xs text-sm leading-relaxed"
            >
              We leverage technology to simplify legal information, ensuring everyone understands their rights and responsibilities.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {features.map((f, i) => (
              <div key={i} className="bg-[#080808]">
                <FeatureCard feature={f} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SPLIT ─── */}
      <section className="py-24 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-amber-400 text-xs tracking-[0.4em] uppercase block mb-6">Our Mission</span>
            <h2 className="serif text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
              Simplifying<br /><em className="gold-text not-italic">Legal Awareness</em>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We're advocates—dedicated to making legal knowledge accessible to all. Agile enough to adapt quickly, yet comprehensive enough to provide the depth and clarity you need.
            </p>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 text-amber-400 text-sm tracking-widest uppercase font-medium hover:gap-5 transition-all duration-300"
            >
              Start Learning <span>→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-700 object-cover h-64"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office"
            />
            <img
              className="w-full rounded-sm mt-8 grayscale hover:grayscale-0 transition-all duration-700 object-cover h-64"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-amber-400 text-xs tracking-[0.4em] uppercase block mb-6">Get Started Today</span>
            <h2 className="serif text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
              Ready to Know<br /><em className="gold-text not-italic">Your Rights?</em>
            </h2>
            <p className="text-gray-400 text-lg mb-12">Try KnowYourRights Platform — free to start, powerful to grow.</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-4 px-12 py-5 bg-amber-400 text-black font-bold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all duration-300 group"
            >
              Start Free Trial
              <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer ref={nextSectionRef} id="contact" className="border-t border-white/10 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-amber-400/60 flex items-center justify-center">
                  <span className="text-amber-400 text-xs">⚖</span>
                </div>
                <span className="text-white font-semibold tracking-widest text-sm uppercase">KnowYourRights</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Democratizing legal knowledge through technology. Every citizen deserves to understand their rights.
              </p>
            </div>

            <div>
              <h3 className="text-white text-xs tracking-widest uppercase mb-6">Follow Us</h3>
              <ul className="space-y-3">
                <li><Link to="https://x.com/SowmikD22343" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300">X (Twitter)</Link></li>
                <li><Link to="https://www.linkedin.com/in/sowmik-dey-8390a827b/" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300">LinkedIn</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-xs tracking-widest uppercase mb-6">Contact</h3>
              <ul className="space-y-3">
                <li><span className="text-gray-500 text-sm">+91 98308 69972</span></li>
                <li><span className="text-gray-500 text-sm">sowmikdey23@gmail.com</span></li>
                <li className="pt-2"><Link to="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-gray-600 text-xs tracking-widest">© 2025 KnowYourRights. All Rights Reserved.</span>
            <span className="text-gray-600 text-xs tracking-widest">Crafted with ⚖️ for Justice</span>
          </div>
        </div>
      </footer>
    </div>
  )
}