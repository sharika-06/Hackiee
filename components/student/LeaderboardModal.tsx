'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Star, X, Medal, TrendingUp, User } from 'lucide-react';

interface StudentRanking {
    rank: number;
    name: string;
    level: string;
    score: number;
    time: string;
    isUser?: boolean;
}

const TOP_STUDENTS: StudentRanking[] = [
    { rank: 1, name: "Arjun Mehta", level: "Stage 5", score: 98, time: "4m 12s" },
    { rank: 2, name: "Sona Maria Sony", level: "Stage 5", score: 96, time: "4m 45s", isUser: true },
    { rank: 3, name: "Priya Sharma", level: "Stage 5", score: 95, time: "5m 02s" },
    { rank: 4, name: "Rahul Das", level: "Stage 4", score: 92, time: "3m 58s" },
    { rank: 5, name: "Ananya Iyer", level: "Stage 4", score: 89, time: "4m 20s" },
    { rank: 6, name: "Vikram Singh", level: "Stage 3", score: 87, time: "3m 15s" },
];

interface LeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="max-w-2xl w-full glass border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="relative p-8 border-b border-white/10 shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shadow-lg shadow-yellow-500/10">
                                <Trophy size={32} className="text-yellow-500" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Global Leaderboard</h2>
                                <p className="text-gray-400 text-sm font-medium tracking-wide flex items-center gap-2">
                                    <TrendingUp size={14} className="text-green-400" />
                                    Top Performers by Neural Mastery & Speed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <div className="space-y-3">
                            {TOP_STUDENTS.map((student) => (
                                <motion.div
                                    key={student.rank}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: student.rank * 0.1 }}
                                    className={`relative p-5 rounded-2xl border transition-all flex items-center justify-between group ${student.isUser
                                            ? 'bg-blue-500/10 border-blue-500/30'
                                            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.03]'
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${student.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                                                student.rank === 2 ? 'bg-gray-300/20 text-gray-300' :
                                                    student.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                                                        'bg-white/5 text-gray-500'
                                            }`}>
                                            {student.rank === 1 ? <Medal size={20} /> : student.rank}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${student.isUser ? 'bg-blue-500 border-blue-400/50' : 'bg-white/5 border-white/10'
                                                }`}>
                                                <span className="text-xs font-bold uppercase">{student.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className={`font-bold text-lg ${student.isUser ? 'text-blue-400' : 'text-white'}`}>
                                                        {student.name}
                                                    </p>
                                                    {student.isUser && (
                                                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30 font-black uppercase tracking-widest">You</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{student.level}</span>
                                                    <div className="w-1 h-1 rounded-full bg-gray-700" />
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                        <Clock size={10} className="text-blue-400" />
                                                        {student.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="flex items-center gap-1 justify-end">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-xl font-black text-white">{student.score}%</span>
                                        </div>
                                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-0.5">Neural Score</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-white/10 bg-white/[0.01] shrink-0">
                        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.2em]">
                            <p className="text-gray-600">Leaderboard updates every 60m</p>
                            <p className="text-blue-400/70">Top 0.1% of Neural Talent</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
