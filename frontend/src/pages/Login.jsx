import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login data:', formData);
      navigate('/generate');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]">
      <div className="flex w-full h-full">
        {/* Left side - Image and Overlay */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden group">
          <div 
            className="absolute inset-0 w-full h-full transform transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:rotate-1"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-[#0f172a]/90 z-10 transition-all duration-1000 ease-in-out group-hover:bg-[#0f172a]/80">
            <div className="flex h-full items-center px-16">
              <div className="relative transition-transform duration-700 ease-out transform group-hover:translate-y-[-8px]">
                <h2 className="text-4xl font-bold text-white mb-4 transition-all duration-700 group-hover:text-blue-400">Welcome Back</h2>
                <p className="max-w-md text-gray-300 text-base leading-relaxed transition-all duration-700 group-hover:text-white">
                  Experience the power of AI-driven content generation. Create, innovate, and transform your ideas into reality.
                </p>
                <div className="mt-6 flex gap-6">
                  <div className="flex items-center gap-2 transition-all duration-500 hover:transform hover:translate-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 transition-colors duration-500 hover:text-blue-400">Real-time Generation</span>
                  </div>
                  <div className="flex items-center gap-2 transition-all duration-500 hover:transform hover:translate-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 transition-colors duration-500 hover:text-green-400">Smart AI</span>
                  </div>
                  <div className="flex items-center gap-2 transition-all duration-500 hover:transform hover:translate-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 transition-colors duration-500 hover:text-purple-400">Secure Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Sign In</h2>
              <p className="mt-2 text-gray-400">Welcome back! Please enter your details.</p>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="example@example.com" 
                  required 
                  className="block w-full px-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 placeholder-gray-500" 
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Your Password" 
                  required 
                  className="block w-full px-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 placeholder-gray-500" 
                />
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 text-blue-500 bg-[#1e293b] border-gray-700 rounded focus:ring-blue-500" 
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">Remember me</label>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0f172a] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-[#1e293b] transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Google
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-[#1e293b] transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-400">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
