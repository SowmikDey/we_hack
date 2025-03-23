import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement actual signup logic here
      console.log('Signup data:', formData);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, formData);
      if(response.status === 201){
        navigate('/generate');
      }
      
    } catch (err) {
      setError('Error creating account. Please try again.',err.mesage);
    }
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto">
          <div className="w-full lg:w-7/12 flex items-center justify-center mb-6 lg:mb-0">
            <div className="w-full max-w-sm">
              <img 
                src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" 
                alt="Signup" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div className="w-full lg:w-5/12 relative">
            <div className="bg-white shadow-2xl rounded-xl p-6 relative z-10">
              <p className="text-3xl font-medium text-center leading-snug font-serif mb-4">Sign up for an account</p>
              {error && <p className="text-red-500 text-center mb-3">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <p className="bg-white px-2 -mt-3 ml-2 font-medium text-gray-600 absolute">Username</p>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John" 
                    type="text" 
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="relative">
                  <p className="bg-white px-2 -mt-3 ml-2 font-medium text-gray-600 absolute">Email</p>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="123@ex.com" 
                    type="email" 
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="relative">
                  <p className="bg-white px-2 -mt-3 ml-2 font-medium text-gray-600 absolute">Password</p>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password" 
                    type="password" 
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 text-lg font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                >
                  Submit
                </button>
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-indigo-500 hover:text-indigo-600">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
            <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-24 h-24 -mt-8 -ml-8 text-yellow-300 fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72"/>
                      <circle cx="15.296" cy="3.445" r="2.719"/>
                      <circle cx="27.333" cy="3.445" r="2.72"/>
                      <circle cx="39.369" cy="3.445" r="2.72"/>
                      <circle cx="51.405" cy="3.445" r="2.72"/>
                      <circle cx="63.441" cy="3.445" r="2.72"/>
                      <circle cx="75.479" cy="3.445" r="2.72"/>
                      <circle cx="87.514" cy="3.445" r="2.719"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-24 h-24 -mb-8 -mr-8 text-indigo-500 fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72"/>
                      <circle cx="15.296" cy="3.445" r="2.719"/>
                      <circle cx="27.333" cy="3.445" r="2.72"/>
                      <circle cx="39.369" cy="3.445" r="2.72"/>
                      <circle cx="51.405" cy="3.445" r="2.72"/>
                      <circle cx="63.441" cy="3.445" r="2.72"/>
                      <circle cx="75.479" cy="3.445" r="2.72"/>
                      <circle cx="87.514" cy="3.445" r="2.719"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 