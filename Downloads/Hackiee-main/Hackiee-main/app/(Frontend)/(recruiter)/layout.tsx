'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LogOut,
    Settings,
    HelpCircle,
    ChevronDown
} from 'lucide-react';

export default function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = () => {
        localStorage.clear();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-white/10 glass px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center font-bold text-white">V</div>
                    <span className="font-bold text-xl tracking-tight">VeriSkill <span className="text-blue-400">Pro</span></span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-4 text-sm font-medium">
                        <Link href="/recruiter" className={`transition-colors py-1 ${pathname === '/recruiter' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}>
                            Candidates
                        </Link>
                        <Link href="/jobs" className={`transition-colors py-1 ${pathname === '/jobs' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}>
                            Jobs
                        </Link>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors py-1">Analytics</a>
                    </div>
                    <div className="h-6 w-px bg-white/10" />

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-3 rounded-2xl transition-all group"
                        >
                            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-xs font-bold text-indigo-400 group-hover:scale-105 transition-transform">TA</div>
                            <div className="text-left hidden sm:block">
                                <p className="text-xs font-semibold text-white leading-tight">Talent Acquisition</p>
                                <p className="text-[10px] text-gray-400">Enterprise Plan</p>
                            </div>
                            <ChevronDown size={14} className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsProfileOpen(false)}
                                />
                                <div className="absolute right-0 mt-3 w-56 bg-[#0f0f0f] border border-white/10 rounded-[20px] shadow-2xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right backdrop-blur-xl">
                                    <div className="px-4 py-3 border-b border-white/5 mb-1">
                                        <p className="text-xs font-bold text-white">Signed in as</p>
                                        <p className="text-[10px] text-gray-400 truncate">recruiter@veriskill.ai</p>
                                    </div>

                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        <Settings size={16} className="text-gray-500" />
                                        Account Settings
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        <HelpCircle size={16} className="text-gray-500" />
                                        Help Center
                                    </button>

                                    <div className="h-px bg-white/5 my-1" />

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/[0.05] transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
