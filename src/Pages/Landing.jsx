import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Video, Users, Globe, BookOpen, CheckCircle, Facebook, Twitter, Instagram, Linkedin, Sparkles } from "lucide-react";

const Landing = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-600">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center bg-transparent relative z-20">
                <div className="flex items-center space-x-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-[#5AB2FF] rounded-lg shadow-sm group-hover:rotate-12 transition-transform"></div>
                    <span className="text-2xl font-bold text-[#2C3E50]">Diginotes</span>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/login" className="px-6 py-2 rounded-full font-semibold text-gray-700 hover:bg-white/50 transition-colors">Log In</Link>
                    <Link to="/register" className="px-6 py-2 bg-[#5AB2FF] text-white rounded-full font-semibold hover:bg-[#4A90E2] shadow-lg transition-all hover:scale-105">Sign Up</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center relative perspective-1000"
            >
                {/* Decorative Blobs following mouse */}
                <div
                    className="absolute w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePos.x * 100}px, ${mousePos.y * 100}px)`,
                        left: '10%',
                        top: '20%'
                    }}
                ></div>
                <div
                    className="absolute w-64 h-64 bg-purple-400 opacity-10 rounded-full blur-[80px] pointer-events-none transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePos.x * -150}px, ${mousePos.y * -150}px)`,
                        right: '5%',
                        bottom: '10%'
                    }}
                ></div>

                <div
                    className="space-y-8 relative z-10 transition-transform duration-200"
                    style={{
                        transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
                    }}
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-[#5AB2FF] rounded-full text-xs font-black uppercase tracking-widest animate-bounce">
                        <Sparkles size={14} />
                        <span>Interactive Learning</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-[#2C3E50] leading-tight uppercase tracking-tight">
                        Find the best <br />
                        online course <br />
                        <span className="text-[#5AB2FF]">& learn</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                        Unlock your potential with premium courses designed by experts.
                        Join thousands of students on their journey to excellence.
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/register" className="px-10 py-4 bg-[#5AB2FF] text-white rounded-2xl font-bold hover:bg-[#4A90E2] shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 block w-fit hover:scale-105 active:scale-95">
                            Explore Courses
                        </Link>
                    </div>

                    {/* Feature Badges */}
                    <div className="grid grid-cols-3 gap-4 pt-8">
                        <div
                            className="bg-white p-4 rounded-3xl shadow-sm border border-blue-50 flex flex-col items-center text-center space-y-2 transition-all hover:shadow-xl hover:-translate-y-2"
                            style={{ transform: `translateZ(20px)` }}
                        >
                            <div className="p-3 bg-blue-50 rounded-2xl text-[#5AB2FF]"><Video size={24} /></div>
                            <span className="text-sm font-bold text-gray-700">Audio & Video</span>
                        </div>
                        <div
                            className="bg-white p-4 rounded-3xl shadow-sm border border-blue-50 flex flex-col items-center text-center space-y-2 transition-all hover:shadow-xl hover:-translate-y-2"
                            style={{ transform: `translateZ(40px)` }}
                        >
                            <div className="p-3 bg-blue-50 rounded-2xl text-[#5AB2FF]"><Globe size={24} /></div>
                            <span className="text-sm font-bold text-gray-700">Virtual Class</span>
                        </div>
                        <div
                            className="bg-white p-4 rounded-3xl shadow-sm border border-blue-50 flex flex-col items-center text-center space-y-2 transition-all hover:shadow-xl hover:-translate-y-2"
                            style={{ transform: `translateZ(20px)` }}
                        >
                            <div className="p-3 bg-blue-50 rounded-2xl text-[#5AB2FF]"><Users size={24} /></div>
                            <span className="text-sm font-bold text-gray-700">Group Study</span>
                        </div>
                    </div>
                </div>

                <div
                    className="relative transition-transform  duration-300 ease-out flex justify-center"
                    style={{
                        transform: `rotateY(${mousePos.x * -15}deg) rotateX(${mousePos.y * 15}deg)`
                    }}
                >
                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-[120px] opacity-30 -z-10"></div>

                    {/* Extra Floating Decor */}
                    <div
                        className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 z-20 transition-transform duration-700"
                        style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px) translateZ(80px)` }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                                <BookOpen size={16} />
                            </div>
                            <div>
                                <p className="text-[8px] text-gray-400 font-bold uppercase">New Material</p>
                                <p className="text-xs font-black text-gray-800">Advanced React</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute top-1/2 -right-10 bg-[#5AB2FF] p-3 rounded-2xl shadow-xl z-20 text-white transition-transform duration-1000"
                        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * -70}px) translateZ(30px) rotate(12deg)` }}
                    >
                        <Sparkles size={20} />
                    </div>

                    <div className="relative max-w-[480px] w-full">
                        <img
                            src="/Images/hero-student-v2.png"
                            alt="Student with laptop"
                            className="w-full h-auto drop-shadow-[0_40px_40px_rgba(45,92,254,0.15)] rounded-[40px] transform transition-transform duration-500 hover:scale-[1.03]"
                        />
                    </div>

                  

                    {/* Background decorative circles */}
                    <div className="absolute -top-20 -left-16 w-32 h-32 border-4 border-dashed border-blue-100 rounded-full animate-[spin_20s_linear_infinite] -z-10"></div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-24 rounded-[60px] shadow-sm z-10 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-bold text-[#2C3E50]">Our Platform Offerings</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Providing a comprehensive learning environment with expert guidance and modern resources.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="text-center space-y-3 bg-[#F8FCFF] p-10 rounded-[40px] border border-blue-50 hover:bg-white hover:shadow-xl transition-all group">
                            <p className="text-5xl font-black text-[#5AB2FF] group-hover:scale-110 transition-transform">1300+</p>
                            <p className="text-gray-500 font-semibold uppercase text-xs tracking-widest">Online Courses</p>
                        </div>
                        <div className="text-center space-y-3 bg-[#F8FCFF] p-10 rounded-[40px] border border-blue-50 hover:bg-white hover:shadow-xl transition-all group">
                            <p className="text-5xl font-black text-[#5AB2FF] group-hover:scale-110 transition-transform">200+</p>
                            <p className="text-gray-500 font-semibold uppercase text-xs tracking-widest">Free Videos</p>
                        </div>
                        <div className="text-center space-y-3 bg-[#F8FCFF] p-10 rounded-[40px] border border-blue-50 hover:bg-white hover:shadow-xl transition-all group">
                            <p className="text-5xl font-black text-[#5AB2FF] group-hover:scale-110 transition-transform">10k+</p>
                            <p className="text-gray-500 font-semibold uppercase text-xs tracking-widest">Lessons</p>
                        </div>
                        <div className="text-center space-y-3 bg-[#F8FCFF] p-10 rounded-[40px] border border-blue-50 hover:bg-white hover:shadow-xl transition-all group">
                            <p className="text-5xl font-black text-[#5AB2FF] group-hover:scale-110 transition-transform">85+</p>
                            <p className="text-gray-500 font-semibold uppercase text-xs tracking-widest">Experts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-[#2C3E50] py-24 text-white mt-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#5AB2FF] opacity-10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">World-Class Learning For <br />Anyone, Anywhere</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg opacity-80">Start your journey today and unlock a world of possibilities with our comprehensive learning resources.</p>
                    <Link to="/register" className="inline-block px-12 py-6 bg-[#5AB2FF] hover:bg-[#4A90E2] text-white rounded-2xl font-bold text-xl shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 hover:-rotate-1">
                        Get Started for Free
                    </Link>
                </div>
            </section>

            {/* Main Footer */}
            <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-[#5AB2FF] rounded-lg"></div>
                            <span className="text-2xl font-bold text-[#2C3E50]">Diginotes</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed max-w-xs">
                            Empowering students through high-quality digital resources and innovative learning tools.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-[#2C3E50] mb-8">Platform</h4>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><Link to="/courses" className="hover:text-[#5AB2FF] transition-colors">All Courses</Link></li>
                            <li><Link to="#" className="hover:text-[#5AB2FF] transition-colors">Mentors</Link></li>
                            <li><Link to="#" className="hover:text-[#5AB2FF] transition-colors">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-[#5AB2FF] transition-colors">Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-[#2C3E50] mb-8">Company</h4>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><Link to="#" className="hover:text-[#5AB2FF] transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-[#5AB2FF] transition-colors">Contact</Link></li>
                            <li><Link to="#" className="hover:text-[#5AB2FF] transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-[#5AB2FF] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-[#2C3E50] mb-8">Install App</h4>
                        <p className="text-gray-500 mb-6">Available on iOS and Android</p>
                        <div className="space-y-4">
                            <div className="bg-[#2C3E50] p-4 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-[#34495E] transition-colors">
                                <span className="text-white">Apple Store</span>
                            </div>
                            <div className="bg-[#2C3E50] p-4 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-[#34495E] transition-colors">
                                <span className="text-white">Google Play</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
                    <p className="text-gray-400 text-sm">© 2025 Diginotes. All rights reserved.</p>
                    <div className="flex space-x-8 text-sm text-gray-400 font-medium">
                        <Link to="#" className="hover:text-[#5AB2FF]">Terms</Link>
                        <Link to="#" className="hover:text-[#5AB2FF]">Privacy</Link>
                        <Link to="#" className="hover:text-[#5AB2FF]">Cookies</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
