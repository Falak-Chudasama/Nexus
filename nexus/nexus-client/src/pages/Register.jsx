import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skillsOffered: '',
    skillsNeeded: ''
  });
  
  const { register } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Convert comma-separated strings into arrays and trim whitespace
    const formatSkills = (skillString) => 
      skillString.split(',').map(skill => skill.trim()).filter(skill => skill !== '');

    const submissionData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      skillsOffered: formatSkills(formData.skillsOffered),
      skillsNeeded: formatSkills(formData.skillsNeeded)
    };

    try {
      await register(submissionData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Join Nexus</h2>
          <p className="text-sm text-gray-500 mt-2">Start bartering your skills today.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Chen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              minLength="6"
              required
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills You Can Offer
              <span className="text-gray-400 font-normal ml-2">(comma separated)</span>
            </label>
            <input
              type="text"
              name="skillsOffered"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
              value={formData.skillsOffered}
              onChange={handleChange}
              placeholder="React, Machine Learning, Figma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills You Need
              <span className="text-gray-400 font-normal ml-2">(comma separated)</span>
            </label>
            <input
              type="text"
              name="skillsNeeded"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
              value={formData.skillsNeeded}
              onChange={handleChange}
              placeholder="UI Design, Python Debugging, Copywriting"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition-colors mt-6 font-medium disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;