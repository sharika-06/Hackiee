'use client';

import React from 'react';
import { Building, Settings, Mail, MapPin, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CompanyWelcome() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#050505]">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full relative z-10"
            >
                <div className="glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative">
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-24 h-24 rounded-2xl premium-gradient flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6 group">
                            <Building size={40} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            Acme Technologies <CheckCircle2 size={24} className="text-emerald-500" />
                        </h2>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5">Enterprise Partner</span>
                    </div>

                    <div className="space-y-6 bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-10">
                        <div className="flex items-center gap-5 text-gray-400">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                <Mail size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Primary Contact</p>
                                <p className="text-white font-medium">admin@acmecorp.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 text-gray-400">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                <MapPin size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Headquarters</p>
                                <p className="text-white font-medium">San Francisco, CA</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 text-gray-400">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                                <Globe size={20} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Industry</p>
                                <p className="text-white font-medium">Artificial Intelligence / SaaS</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/company/guidelines')}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 group"
                    >
                        <span>Next</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
