'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Shield, Moon, Bell, HelpCircle, LogOut, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function StudentProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Read email from local storage after component mounts
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs hover:bg-blue-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] uppercase font-bold"
            >
                {userEmail ? userEmail.charAt(0) : 'U'}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50 text-white"
                        style={{ backgroundColor: 'rgba(20, 20, 20, 0.95)', backdropFilter: 'blur(16px)' }}
                    >
                        {/* Profile Header */}
                        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex flex-shrink-0 items-center justify-center text-black">
                                <User size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold truncate leading-tight">Developer</p>
                                <p className="text-xs text-gray-400 truncate mt-0.5">{userEmail || 'developer@example.com'}</p>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            <Link
                                href="/leaderboard"
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors"
                            >
                                <Trophy size={18} className="text-yellow-400" />
                                <span className="font-semibold text-yellow-300">Leaderboard</span>
                            </Link>
                            <button className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors">
                                <Settings size={18} className="text-gray-300" />
                                Account Settings
                            </button>
                            <button className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors">
                                <Shield size={18} className="text-gray-300" />
                                Security & 2FA
                            </button>
                        </div>

                        <div className="py-1 border-t border-white/10">
                            <button className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors">
                                <Moon size={18} className="text-gray-300" />
                                Dark Mode
                            </button>
                            <button className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors">
                                <Bell size={18} className="text-gray-300" />
                                Notifications
                            </button>
                        </div>



                        <div className="py-1 border-t border-white/10">
                            <button className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors">
                                <HelpCircle size={18} className="text-gray-300" />
                                Help Center
                            </button>
                            <Link href="/" className="w-full px-4 py-2 text-left flex items-center gap-3 text-sm hover:bg-white/10 transition-colors">
                                <LogOut size={18} className="text-gray-300" />
                                <span>Sign Out</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
