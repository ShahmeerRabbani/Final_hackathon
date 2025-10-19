import React, { useState } from 'react';
import { Heart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = async (email, password) => {
    if (email === 'test@example.com' && password === '123456') {
      return { error: null };
    } else {
      return { error: new Error('Invalid credentials') };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // const { error } = await signIn(email, password);
      // if (error) throw error;
      const data = {
        email,
        password,
      }

      const response = await axios.post('http://final-hackathon-backend-psi.vercel.app/login', JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      })
      console.log('response', response)
     if(response.status == 201 || 200){
      await localStorage.setItem('authToken', JSON.stringify(response?.data?.data?._id));
      alert('Login successful!');
      window.location.reload();
     }
    } catch (err) {
      setError(err.message || 'An error occurred');
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
            Apne account mein login karen
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Please wait...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to={"/signup"}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
            >
              Naya account banayein? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
