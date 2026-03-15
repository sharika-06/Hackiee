'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Layers, Brain, ArrowRight, CheckCircle } from 'lucide-react';

const levels = [
    {
        id: 'beginner',
        label: 'Beginner',
        icon: Zap,
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-600',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        shadow: 'shadow-emerald-500/20',
        route: '/student',
        description: 'Fundamental programming challenges to build your foundation.',
        topics: ['Hello World', 'Odd/Even', 'Prime Numbers', 'Factorials', 'Fibonacci', 'Palindrome'],
        badge: 'Entry Level',
    },
    {
        id: 'intermediate',
        label: 'Intermediate',
        icon: Layers,
        color: 'blue',
        gradient: 'from-blue-500 to-indigo-600',
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        shadow: 'shadow-blue-500/20',
        route: '/student/intermediate',
        description: 'Series, pattern recognition and mathematical sequence problems.',
        topics: ['Number Patterns', 'Star Pyramids', 'Digital Root', 'Collatz Sequence', "Pascal's Triangle", 'Reverse Number'],
        badge: 'Patterns & Series',
    },
    {
        id: 'expert',
        label: 'Expert',
        icon: Brain,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-600',
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        shadow: 'shadow-purple-500/20',
        route: '/student/expert',
        description: 'Advanced Data Structures & Algorithms that measure true engineering depth.',
        topics: ['Binary Search', 'Linked List Reversal', 'Two Sum (HashMap)', 'Stack via Queue', 'Merge Sort', 'Cycle Detection'],
        badge: 'DSA Mastery',
    },
];

export default function LevelSelectPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-12">
            {/* Background glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-5xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-4">VeriSkill AI · Assessment</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                        Choose Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Difficulty Level
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                        Select a level that matches your current skill set. Each tier has unique challenges designed to measure specific competencies.
                    </p>
                </motion.div>

                {/* Level Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {levels.map((level, i) => {
                        const Icon = level.icon;
                        return (
                            <motion.button
                                key={level.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push(level.route)}
                                className={`relative text-left rounded-3xl border ${level.border} ${level.bg} p-8 flex flex-col gap-6 group transition-all duration-300 hover:shadow-2xl hover:${level.shadow} cursor-pointer overflow-hidden`}
                            >
                                {/* Badge */}
                                <span className={`absolute top-5 right-5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${level.gradient} text-white`}>
                                    {level.badge}
                                </span>

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${level.gradient} shadow-lg`}>
                                    <Icon size={28} className="text-white" />
                                </div>

                                {/* Title & description */}
                                <div>
                                    <h2 className="text-2xl font-black text-white mb-2">{level.label}</h2>
                                    <p className="text-sm text-gray-400 leading-relaxed">{level.description}</p>
                                </div>

                                {/* Topics */}
                                <div className="space-y-2">
                                    {level.topics.map((topic) => (
                                        <div key={topic} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle size={13} className={level.iconColor} />
                                            {topic}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className={`flex items-center gap-2 font-bold text-sm ${level.iconColor} group-hover:translate-x-1 transition-transform mt-auto`}>
                                    Start {level.label} <ArrowRight size={16} />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
