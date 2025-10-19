import React, { useState } from 'react';
import { Heart, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const signUp = async (email, password, fullName) => {
  //   if (!email || !password || !fullName) {
  //     return { error: new Error('Please fill all fields') };
  //   }
  //   // simulate API signup success + token storage
  //   localStorage.setItem('authToken', 'mock_token');
  //   return { error: null };
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!fullName.trim()) throw new Error('Please enter your full name');

      // const { error } = await signUp(email, password, fullName);
      // if (error) throw error;
      const data = {
        email,
        password,
        name:fullName
      }

      const response = await axios.post('http://localhost:5000/signup', JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      })
      console.log('response', response)
     if(response.status == 201){
      await localStorage.setItem('authToken', JSON.stringify(response?.data?.data?._id));
      alert('Account created successfully!');
      window.location.reload();
     }
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            HealthMate
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Naya account banayein
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* ✅ Input Fields Restored */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name / Pura Naam
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
            >
              Pehle se account hai? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
