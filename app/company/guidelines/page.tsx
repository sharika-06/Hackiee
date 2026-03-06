'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Fingerprint, Lock, CheckCircle2, Play } from 'lucide-react';

export default function CompanyGuidelines() {
    const router = useRouter();

    const handleStart = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            console.error("Fullscreen request failed:", err);
        }
        router.push('/company/test');
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full relative z-10 my-10"
            >
                <div className="glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <ShieldCheck size={40} className="text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Verification Platform Guidelines</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Please review our strict assessment monitoring protocols before proceeding to the company dashboard.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2.5 bg-blue-500/10 rounded-xl">
                                    <Fingerprint size={24} className="text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Bio-Metric Monitoring</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                All candidates passing through the portal are subjected to keystroke dynamics analysis and facial monitoring during assessments. Your organization has full access to anomaly logs.
                            </p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                                    <CheckCircle2 size={24} className="text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Trust Index Score</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Candidate scores are weighted organically based on solution correctness, anti-cheat AI models, and zero-day threat analysis. Only candidates above 85% trust index should be hired.
                            </p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2.5 bg-purple-500/10 rounded-xl">
                                    <Lock size={24} className="text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Data Exfiltration</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Proprietary assessment challenges created by your company are encrypted via AES-256 and stored in secure cloud nodes. Do not share raw test inputs publicly to preserve test integrity.
                            </p>
                        </div>

                        <div className="bg-white/[0.02] border border-red-500/20 p-6 rounded-2xl bg-red-500/[0.02] hover:border-red-500/40 transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2.5 bg-red-500/10 rounded-xl">
                                    <AlertTriangle size={24} className="text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white text-red-100">Disciplinary Alerts</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Any falsification of company identity or misuse of candidate biometric data will result in immediate termination of partner access and reporting to legal compliance bodies.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="flex items-center gap-3 mb-8 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/50 cursor-pointer" />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">I acknowledge and agree to abide by these guidelines</span>
                        </label>

                        <button
                            onClick={handleStart}
                            className="bg-white text-black px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 hover:bg-gray-100 transition-all shadow-xl shadow-white/10"
                        >
                            <Play size={20} className="fill-black" />
                            Start Now
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
