'use client';

import React from 'react';
import {
    Users,
    ShieldCheck,
    AlertTriangle,
    UserCheck,
    Search,
    Filter,
    BarChart3,
    Mic2,
    Brain,
    ChevronRight
} from 'lucide-react';

const candidates = [
    {
        name: 'Alex Thompson',
        role: 'Senior Frontend Engineer',
        techScore: 94,
        trustIndex: 98,
        logicAccuracy: 96,
        voiceConfidence: 92,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 0
    },
    {
        name: 'Sarah Chen',
        role: 'Fullstack Developer',
        techScore: 88,
        trustIndex: 92,
        logicAccuracy: 85,
        voiceConfidence: 89,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 1
    },
    {
        name: 'Michael Rodriguez',
        role: 'Backend Architect',
        techScore: 91,
        trustIndex: 42,
        logicAccuracy: 35,
        voiceConfidence: 15,
        status: 'Flagged',
        color: 'text-red-400',
        incidents: 14
    },
    {
        name: 'Priya Patel',
        role: 'Junior Web Developer',
        techScore: 82,
        trustIndex: 89,
        logicAccuracy: 80,
        voiceConfidence: 85,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 2
    },
];

export default function RecruiterDashboard() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Talent <span className="text-blue-500">Analytics</span></h1>
                    <p className="text-gray-400 mt-2 text-lg">AI-driven competency and trust verification dashboard.</p>
                </div>
                <div className="flex gap-3">
                    <button className="glass border-white/5 px-5 py-2.5 rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center gap-2">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="premium-gradient text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2">
                        <Users size={18} />
                        Hire Talent
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Verified Pipeline', value: '142', icon: ShieldCheck, color: 'text-blue-400', trend: '+12%' },
                    { label: 'Average Trust', value: '88.4%', icon: BarChart3, color: 'text-green-400', trend: '+2.4%' },
                    { label: 'Logic Discrepancies', value: '8', icon: Brain, color: 'text-purple-400', trend: '-5%' },
                    { label: 'Security Flags', value: '3', icon: AlertTriangle, color: 'text-red-400', trend: 'Critical' },
                ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/10 group hover:border-white/20 transition-all relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded bg-white/5 ${stat.trend === 'Critical' ? 'text-red-400' : 'text-green-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-xl font-bold">Candidate Verification Matrix</h2>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/10 bg-white/[0.01]">
                                <th className="px-8 py-5 font-bold">Candidate Profile</th>
                                <th className="px-8 py-5 font-bold text-center">Trust Index</th>
                                <th className="px-8 py-5 font-bold text-center">Logic Score</th>
                                <th className="px-8 py-5 font-bold text-center">Voice Conf.</th>
                                <th className="px-8 py-5 font-bold">Status</th>
                                <th className="px-8 py-5 font-bold text-right">Verification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {candidates.map((candidate, i) => (
                                <tr key={i} className="hover:bg-white/[0.03] transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-lg font-bold text-gray-300 group-hover:text-white border border-white/10 shadow-inner">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-bold text-white block text-lg">{candidate.name}</span>
                                                <span className="text-xs text-gray-500 font-medium uppercase tracking-tight">{candidate.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className={`text-lg font-black ${candidate.trustIndex < 60 ? 'text-red-500' : 'text-blue-400'}`}>
                                                {candidate.trustIndex}%
                                            </span>
                                            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${candidate.trustIndex < 60 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-blue-500'}`}
                                                    style={{ width: `${candidate.trustIndex}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center gap-1">
                                            <Brain size={16} className="text-purple-400 opacity-50 mb-1" />
                                            <span className="text-sm font-bold text-gray-300">{candidate.logicAccuracy}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <Mic2 size={16} className="text-indigo-400 opacity-50 mb-1" />
                                            <span className="text-xs font-bold text-gray-400 border border-white/5 px-2 py-0.5 rounded bg-white/5">
                                                {candidate.voiceConfidence}% <span className="text-[8px] opacity-50">Score</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${candidate.color.replace('text', 'border')}/20 ${candidate.color.replace('text', 'bg')}/10 ${candidate.color} shadow-sm inline-flex items-center gap-2`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${candidate.color.replace('text', 'bg')}`} />
                                            {candidate.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                            <ChevronRight size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-8 py-5 border-t border-white/10 bg-white/[0.01] flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>Showing {candidates.length} unique competency assessments</span>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Behavioral Sync</span>
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Neural Logic Analysis</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
