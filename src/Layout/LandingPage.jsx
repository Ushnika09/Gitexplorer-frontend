import React, { useState, useEffect } from "react";
import { FiGithub, FiTrendingUp, FiBookmark, FiBarChart2, FiEdit, FiCheck, FiArrowRight } from "react-icons/fi";
import { BiLogIn, BiUserPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would handle form submission here
  };

  const features = [
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: "Real-time GitHub API",
      description: "Access live data from GitHub's API to explore trending repositories in real-time"
    },
    {
      icon: <FiBookmark className="text-3xl" />,
      title: "Smart Bookmarking",
      description: "Save your favorite repositories with notes and organize them for quick access"
    },
    {
      icon: <FiBarChart2 className="text-3xl" />,
      title: "Advanced Analytics",
      description: "Gain insights into repository trends, language distributions, and contributor stats"
    },
    {
      icon: <FiEdit className="text-3xl" />,
      title: "Notes on Bookmarks",
      description: "Add personal notes and reminders to your bookmarked repositories"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="py-5 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl">
            <FiGithub className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            GitExplorer
          </h1>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-xl transition-colors"
          >
            <BiLogIn className="text-lg" />
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            <BiUserPlus className="text-lg" />
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Discover, Explore & Organize <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">GitHub Repositories</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              GitExplorer helps developers find trending repositories, bookmark their favorites, add personal notes, and analyze GitHub data—all in one beautiful interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/register" 
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started Free
                <FiArrowRight className="text-lg" />
              </Link>
              <Link 
                to="/explore" 
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-purple-600 font-semibold rounded-xl border border-purple-200 hover:bg-purple-50 transition-colors"
              >
                Explore Repositories
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 -ml-2 first:ml-0"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-600 -ml-2 first:ml-0"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-700 -ml-2 first:ml-0"></div>
              </div>
              <span>Join 5,000+ developers already using GitExplorer</span>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white font-mono text-sm">
                  {/* Animated code snippet */}
                  <div className="animate-pulse">
                    <span className="text-purple-300">$</span> git explorer --trending
                  </div>
                </div>
                <div className="bg-gray-800 text-gray-200 p-4 font-mono text-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-purple-400">→</span>
                    <span className="text-xs text-gray-500">Live data from GitHub API</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-green-400">✔</span> Loading trending repositories...
                  </div>
                  <div className="mb-1">
                    <span className="text-green-400">✔</span> Found 25 trending repos
                  </div>
                  <div>
                    <span className="text-green-400">✔</span> Ready to explore!
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-purple-100 animate-float">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <FiBookmark className="text-green-600" />
                </div>
                <span className="text-sm font-medium">+128 bookmarks today</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-purple-100 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <FiTrendingUp className="text-purple-600" />
                </div>
                <span className="text-sm font-medium">Trending in JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features for Developers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to discover, organize, and analyze GitHub repositories in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-2xl border transition-all duration-300 ${currentFeature === index ? 'border-purple-300 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-200'}`}
              >
                <div className={`p-3 rounded-xl inline-flex mb-4 ${currentFeature === index ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-purple-100 text-purple-600'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to explore GitHub like never before?</h2>
          <p className="text-lg text-purple-100 mb-8">
            Join thousands of developers who use GitExplorer to discover and organize their favorite repositories.
          </p>
          
          <div className="bg-white rounded-2xl p-2 shadow-xl inline-flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1 min-w-0"
            />
            <button 
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              {isSubmitted ? 'Check Your Email!' : 'Get Started'}
            </button>
          </div>
          
          {isSubmitted && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-100">
              <FiCheck className="text-lg" />
              <span>We've sent a confirmation link to your email!</span>
            </div>
          )}
          
          <p className="text-sm text-purple-200 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                <FiGithub className="text-xl text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">GitExplorer</h2>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p>© {new Date().getFullYear()} GitExplorer. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;