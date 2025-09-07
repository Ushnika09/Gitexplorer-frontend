import React, { useState } from "react";
import { FiGithub, FiEye, FiEyeOff, FiCheck, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Backend should return { message, user, token }
      const { token, user } = res.data;

      // Optionally save JWT for auto-login
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      setIsSubmitted(true);
      setIsLoading(false);

      // Optional: redirect to dashboard after delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setIsLoading(false);
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6 px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <FiGithub className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">GitExplorer</h1>
            </div>
          </div>
          
          <div className="py-10 px-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Created!</h3>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Sign In
                  <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm text-purple-600 font-medium hover:bg-purple-50 transition-colors"
      >
        <FiArrowLeft className="text-lg" />
        Go Back
      </Link>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6 px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-xl">
              <FiGithub className="text-2xl text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">GitExplorer</h1>
          </div>
          <h2 className="text-xl font-semibold text-white">Create your account</h2>
          <p className="text-purple-200 mt-2">Join us to explore GitHub repositories</p>
        </div>

        {/* Form Container */}
        <div className="py-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">Terms and Conditions</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-75 disabled: cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <BiUserPlus className="text-lg" />
                    Create account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;