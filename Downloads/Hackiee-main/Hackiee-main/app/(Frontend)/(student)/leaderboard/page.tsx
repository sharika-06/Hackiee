'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, ArrowLeft, Clock, Code2, Star } from 'lucide-react';
import Link from 'next/link';

const DEMO_LEADERBOARD = [
    { rank: 1, studentEmail: 'arjun.sharma@gmail.com', companyName: 'Google', totalScore: 980, problemsSolved: 5, submittedAt: '2026-03-06T08:30:00Z' },
    { rank: 2, studentEmail: 'priya.menon@outlook.com', companyName: 'Microsoft', totalScore: 945, problemsSolved: 5, submittedAt: '2026-03-06T09:15:00Z' },
    { rank: 3, studentEmail: 'rahul.nair@yahoo.com', companyName: 'Amazon', totalScore: 912, problemsSolved: 4, submittedAt: '2026-03-06T10:00:00Z' },
    { rank: 4, studentEmail: 'sneha.patel@gmail.com', companyName: 'Meta', totalScore: 875, problemsSolved: 4, submittedAt: '2026-03-06T10:45:00Z' },
    { rank: 5, studentEmail: 'vikram.iyer@hotmail.com', companyName: 'Apple', totalScore: 830, problemsSolved: 4, submittedAt: '2026-03-06T11:20:00Z' },
    { rank: 6, studentEmail: 'ananya.kumar@gmail.com', companyName: 'Netflix', totalScore: 790, problemsSolved: 3, submittedAt: '2026-03-06T12:00:00Z' },
    { rank: 7, studentEmail: 'rohan.verma@gmail.com', companyName: 'Swiggy', totalScore: 755, problemsSolved: 3, submittedAt: '2026-03-06T12:40:00Z' },
    { rank: 8, studentEmail: 'divya.pillai@outlook.com', companyName: 'Flipkart', totalScore: 710, problemsSolved: 3, submittedAt: '2026-03-06T13:10:00Z' },
    { rank: 9, studentEmail: 'karthik.s@gmail.com', companyName: 'Zomato', totalScore: 665, problemsSolved: 2, submittedAt: '2026-03-06T13:45:00Z' },
    { rank: 10, studentEmail: 'nandana.nair@gmail.com', companyName: 'Infosys', totalScore: 620, problemsSolved: 2, submittedAt: '2026-03-06T14:20:00Z' },
];

const rankColors: Record<number, { bg: string; border: string; text: string; badge: string }> = {
    1: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', badge: 'bg-yellow-500' },
    2: { bg: 'bg-gray-400/10', border: 'border-gray-400/40', text: 'text-gray-300', badge: 'bg-gray-400' },
    3: { bg: 'bg-orange-600/10', border: 'border-orange-600/40', text: 'text-orange-400', badge: 'bg-orange-500' },
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const getInitials = (email: string) => email.slice(0, 2).toUpperCase();

export default function LeaderboardPage() {
    const top3 = [DEMO_LEADERBOARD[1], DEMO_LEADERBOARD[0], DEMO_LEADERBOARD[2]]; // silver, gold, bronze order for podium

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-6 py-4 flex items-center gap-4">
                <Link href="/student" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    <ArrowLeft size={18} />
                    Back
                </Link>
                <div className="flex items-center gap-2">
                    <Trophy size={22} className="text-yellow-400" />
                    <h1 className="text-lg font-bold">Leaderboard</h1>
                </div>
                <span className="ml-auto text-xs text-gray-600 font-mono border border-white/10 rounded-full px-3 py-1">DEMO DATA</span>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4">
                    {top3.map((entry, i) => {
                        const realRank = [2, 1, 3][i];
                        const colors = rankColors[realRank];
                        const heights = ['h-28', 'h-36', 'h-24'];
                        const labels = ['🥈', '🥇', '🥉'];
                        return (
                            <motion.div
                                key={entry.rank}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`${colors.bg} border ${colors.border} rounded-2xl p-4 flex flex-col items-center justify-end ${heights[i]} text-center`}
                            >
                                <div className="text-2xl mb-1">{labels[i]}</div>
                                <p className="text-xs font-bold text-white truncate w-full text-center">
                                    {entry.studentEmail.split('@')[0]}
                                </p>
                                <p className={`text-lg font-black ${colors.text}`}>{entry.totalScore}</p>
                                <p className="text-[10px] text-gray-500">pts</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Full Table */}
                <div className="rounded-2xl border border-white/10 overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 bg-white/[0.03] text-xs font-black uppercase tracking-widest text-gray-500 border-b border-white/10">
                        <span>#</span>
                        <span>Student</span>
                        <span className="hidden sm:block">Company</span>
                        <span className="flex items-center gap-1"><Code2 size={12} /> Solved</span>
                        <span className="flex items-center gap-1"><Star size={12} /> Score</span>
                    </div>

                    {DEMO_LEADERBOARD.map((entry, idx) => {
                        const colors = rankColors[entry.rank];
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04 }}
                                className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors ${colors?.bg || ''}`}
                            >
                                {/* Rank badge */}
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${entry.rank <= 3
                                    ? `${colors.badge} text-white`
                                    : 'bg-white/5 text-gray-400'
                                    }`}>
                                    {entry.rank <= 3 ? <Medal size={14} /> : entry.rank}
                                </div>

                                {/* Student */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-300 flex-shrink-0">
                                        {getInitials(entry.studentEmail)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{entry.studentEmail.split('@')[0]}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={10} />
                                            {formatDate(entry.submittedAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Company */}
                                <span className="hidden sm:block text-xs text-gray-400 font-medium">{entry.companyName}</span>

                                {/* Problems solved */}
                                <span className="text-sm text-gray-300 font-semibold text-center">{entry.problemsSolved}</span>

                                {/* Score */}
                                <span className={`text-sm font-black ${colors?.text || 'text-white'}`}>{entry.totalScore}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
