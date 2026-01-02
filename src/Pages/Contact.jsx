import React, { useState } from 'react';
import apiClient from '../apis/api-client';
import { toast } from 'react-toastify';
import { Mail, User, MessageCircle, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await apiClient.post(
        '/contact',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2F9] to-[#C5E4F3] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Info */}
        <div className="md:w-1/3 bg-[#3B82F6] p-8 text-white flex flex-col justify-between">
          <div>
             <div className="flex items-center mb-6 space-x-4">
              <div className="bg-blue-400/30 p-3 rounded-full">
                <Mail size={24} />
              </div>
              <div>
            <h2 className="text-3xl font-bold  italic">Get in Touch</h2>
              </div>
            </div>
            <p className="text-blue-100 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="space-y-6">
           
          </div>
          <div className="mt-8">
            <div className="w-24 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-2/3 p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 pr-2 flex items-center pointer-events-none text-gray-400 border-r border-gray-200">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 pr-2 flex items-center pointer-events-none text-gray-400 border-r border-gray-200">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1 block">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-4 pr-2 flex items-start pointer-events-none text-gray-400 border-r border-gray-200">
                    <MessageCircle size={18} className="mt-1" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 placeholder-gray-400 resize-none"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[#3B82F6] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;