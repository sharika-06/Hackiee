'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, User, Briefcase, Building, ArrowRight, Lock, Mail, Eye, EyeOff, Camera, Upload, Trash2 } from 'lucide-react';
import { useIntegrityStore } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { resetSessionMetrics } = useIntegrityStore();
  const [role, setRole] = useState<'student' | 'recruiter' | 'company' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [masterSelfie, setMasterSelfie] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    if (!isLogin && role !== 'company' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      let response: Response;
      let data: any;

      if (role === 'company') {
        if (!masterSelfie) {
          setErrorMsg('Please upload your Master Photo (Identity Anchor) before continuing.');
          setIsLoading(false);
          return;
        }

        // Clear any previous identity anchor to prevent leakage between candidates
        localStorage.removeItem('masterSelfie');

        // Company Exam Portal: validate using fullname, email, and fixed company password
        response = await fetch('http://localhost:5000/api/exam/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullname: studentName, email, password }),
        });
        data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Invalid credentials');
        }

        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('studentName', studentName);
        localStorage.setItem('userRole', 'company');
        localStorage.setItem('accessToken', data.data.token);
        localStorage.setItem('examId', data.data.examId);
        localStorage.setItem('companyName', data.data.companyName);
        if (masterSelfie) {
          localStorage.setItem('masterSelfie', masterSelfie);
        }
        // Reset integrity metrics so each student starts fresh
        resetSessionMetrics();
        router.push('/company');
      } else if (role === 'recruiter') {
        if (email !== 'recruiter@gmail.com' || password !== 'Recruiter') {
          setErrorMsg('Invalid recruiter credentials.');
          setIsLoading(false);
          return;
        }
        // Recruiter portal: explicit credential validation
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', 'recruiter');
        router.push('/recruiter');
      } else if (role === 'student') {
        // Developer: register or login normally
        const endpoint = isLogin ? '/api/developer/login' : '/api/developer/register';
        response = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role }),
        });
        data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.message || 'Authentication failed');
        }

        if (data.success && data.data && data.data.token) {
          localStorage.setItem('accessToken', data.data.token);
          localStorage.setItem('userRole', data.data.role);
          localStorage.setItem('userEmail', email);
          router.push('/level-select');
        } else {
          throw new Error('Unexpected response format');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#050505]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Side: Brand & Value Prop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-2xl shadow-blue-500/20">
              <Shield size={28} className="text-white" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tighter">VeriSkill AI</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Verify Talent. <br />
              <span className="text-gradient">Ensure Integrity.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              The world's first AI-powered competency platform using behavioral bio-metrics and neural logic analysis to verify developer skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="glass p-4 rounded-2xl border-white/5 flex items-start gap-3">
              <Brain size={20} className="text-blue-400 mt-1" />
              <div>
                <p className="text-white text-sm font-bold">Neural Verification</p>
                <p className="text-gray-500 text-xs mt-1">AI Logic Interrogation</p>
              </div>
            </div>
            <div className="glass p-4 rounded-2xl border-white/5 flex items-start gap-3">
              <Lock size={20} className="text-indigo-400 mt-1" />
              <div>
                <p className="text-white text-sm font-bold">Anti-Bypass</p>
                <p className="text-gray-500 text-xs mt-1">Behavioral Tracking</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass rounded-[32px] border-white/10 p-1 bg-white/[0.02] shadow-2xl shadow-black">
            <div className="bg-[#0a0a0a] rounded-[31px] p-10 space-y-8">

              {!role ? (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white">Join VeriSkill AI</h2>
                    <p className="text-sm text-gray-500">Choose your portal to continue</p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setRole('student')}
                      className="w-full glass border-white/5 hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all p-6 rounded-2xl text-left group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                          <User size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">Developer</p>
                          <p className="text-gray-500 text-sm">Take assessments and verify skills</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-gray-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                      onClick={() => setRole('recruiter')}
                      className="w-full glass border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/[0.02] transition-all p-6 rounded-2xl text-left group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                          <Briefcase size={24} className="text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">Recruiter</p>
                          <p className="text-gray-500 text-sm">Find and verify top talent</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-gray-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                      onClick={() => setRole('company')}
                      className="w-full glass border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all p-6 rounded-2xl text-left group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                          <Building size={24} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">Exam Portal</p>
                          <p className="text-gray-500 text-sm">Enter and take your assigned exam</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-gray-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <button
                    onClick={() => setRole(null)}
                    className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    ← Back to role selection
                  </button>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                      {role === 'company'
                        ? 'Company Exam Portal'
                        : role === 'recruiter'
                          ? (isLogin ? 'Welcome back, Recruiter' : 'Register as Recruiter')
                          : (isLogin ? 'Welcome back, Developer' : 'Register as Developer')}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {role === 'company'
                        ? 'Enter your company-provided credentials to begin your exam'
                        : role === 'recruiter'
                          ? (isLogin ? 'Enter your credentials to access the recruiter dashboard' : 'Create a recruiter account to get started')
                          : (isLogin ? 'Enter your credentials to access your dashboard' : 'Create a new account to get started')}
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">

                    {/* Full Name - for company portal (students entering exam) */}
                    {role === 'company' && (
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
                          <input
                            type="text"
                            required
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={role === 'company' ? "name@company.com" : "name@example.com"}
                          className={`w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none transition-all placeholder:text-gray-700 ${role === 'company' ? 'focus:border-emerald-500/50 group-focus-within:text-emerald-500' : 'focus:border-blue-500/50'}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors ${role === 'company' ? 'group-focus-within:text-emerald-500' : 'group-focus-within:text-blue-500'}`} size={20} />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={role === 'company' ? '••••••••••••' : '••••••••••••'}
                          className={`w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none transition-all placeholder:text-gray-700 ${role === 'company' ? 'focus:border-emerald-500/50' : 'focus:border-blue-500/50'}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Master Photo Upload - specifically for Company Portal students */}
                    {role === 'company' && (
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1 flex items-center gap-2">
                          <Camera size={14} className="text-emerald-500" />
                          Master Photo (Identity Anchor)
                        </label>

                        {!masterSelfie ? (
                          <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              const file = e.dataTransfer.files[0];
                              if (file && file.type.startsWith('image/')) {
                                const reader = new FileReader();
                                reader.onload = (rev) => setMasterSelfie(rev.target?.result as string);
                                reader.readAsDataURL(file);
                              }
                            }}
                            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 bg-white/[0.02] ${isDragging ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-white/20'}`}
                          >
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                              <Upload size={20} className="text-emerald-400" />
                            </div>
                            <div className="text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*';
                                  input.onchange = (e: any) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (rev) => setMasterSelfie(rev.target?.result as string);
                                      reader.readAsDataURL(file);
                                    }
                                  };
                                  input.click();
                                }}
                                className="text-emerald-400 font-bold hover:underline text-sm"
                              >
                                Drop your image here
                              </button>
                              <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-widest">or click to browse library</p>
                            </div>
                          </div>
                        ) : (
                          <div className="relative group rounded-2xl border border-white/10 overflow-hidden aspect-video bg-black shadow-2xl">
                            <img src={masterSelfie} alt="Master" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Master Identity Locked</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setMasterSelfie(null)}
                                  className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {!isLogin && role !== 'company' && (
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">Confirm Password</label>
                        <div className="relative group">
                          <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-500`} size={20} />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                          />
                        </div>
                      </div>
                    )}



                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className={`rounded bg-white/5 border-white/10 ${role === 'company' ? 'text-emerald-500' : 'text-blue-500'}`} />
                        <span className="text-xs text-gray-500">Remember session</span>
                      </div>
                      <button type="button" className={`text-xs hover:text-white font-bold transition-colors ${role === 'company' ? 'text-emerald-400' : 'text-blue-400'}`}>Forgot access?</button>
                    </div>

                    {errorMsg && (
                      <div className="text-red-500 text-sm font-semibold px-2">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      disabled={isLoading}
                      className={`w-full text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 ${role === 'company'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-emerald-500/30'
                        : 'premium-gradient hover:shadow-blue-500/30'
                        }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{isLogin ? 'Authorizing...' : 'Registering...'}</span>
                        </div>
                      ) : (
                        <>
                          <span>{isLogin ? 'Establish Secure Session' : (role === 'recruiter' ? 'Register Recruiter Profile' : 'Register Secure Profile')}</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>

                    {/* Only show sign up toggle for Developer/Recruiter, not Company portal */}
                    {role !== 'company' && (
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                          <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className={`font-bold hover:underline transition-all ${role === 'recruiter' ? 'text-indigo-400' : 'text-blue-400'}`}
                          >
                            {isLogin ? 'Sign up' : 'Log in'}
                          </button>
                        </p>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest pt-4">
                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> AES-256</span>
                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Bio-Metric Enc</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div >
    </div >
  );
}
