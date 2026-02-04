import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Digi<span className="text-[#5AB2FF]">Notes</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering learners worldwide with accessible, high-quality resources. Join our community and start your journey today.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-[#5AB2FF] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/home" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Home</Link></li>
              <li><Link to="/courses" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">All Courses</Link></li>
              <li><Link to="/question-paper" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Question Papers</Link></li>
              <li><Link to="/upload-resources" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Share Content</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Contact Us</Link></li>
              <li><Link to="/saved" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Saved Items</Link></li>
              <li><a href="#" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#5AB2FF] transition-colors hover:pl-2 duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB2FF] transition-all placeholder:text-gray-500"
              />
              <button className="bg-[#5AB2FF] hover:bg-[#4a90e2] text-white px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                Subscribe <Send size={16} />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Diginotes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

