'use client';

import React, { useState } from 'react';
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
    ChevronRight,
    Check,
    X,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_CANDIDATES = [
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
    {
        name: 'James Wilson',
        role: 'Cloud Architect',
        techScore: 95,
        trustIndex: 97,
        logicAccuracy: 94,
        voiceConfidence: 96,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 0
    },
    {
        name: 'Emily Davis',
        role: 'UI/UX Designer',
        techScore: 85,
        trustIndex: 94,
        logicAccuracy: 88,
        voiceConfidence: 95,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 1
    },
    {
        name: 'David Miller',
        role: 'Data Scientist',
        techScore: 92,
        trustIndex: 91,
        logicAccuracy: 96,
        voiceConfidence: 87,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 2
    },
    {
        name: 'Sophia Wilson',
        role: 'DevOps Engineer',
        techScore: 89,
        trustIndex: 93,
        logicAccuracy: 90,
        voiceConfidence: 92,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 1
    },
    {
        name: 'Robert Moore',
        role: 'Security Specialist',
        techScore: 91,
        trustIndex: 96,
        logicAccuracy: 95,
        voiceConfidence: 91,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 0
    },
    {
        name: 'Olivia Taylor',
        role: 'Frontend Developer',
        techScore: 87,
        trustIndex: 88,
        logicAccuracy: 85,
        voiceConfidence: 90,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 3
    },
    {
        name: 'William Brown',
        role: 'Mobile Developer',
        techScore: 84,
        trustIndex: 85,
        logicAccuracy: 82,
        voiceConfidence: 88,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 4
    },
    {
        name: 'Isabella Jones',
        role: 'ML Engineer',
        techScore: 96,
        trustIndex: 99,
        logicAccuracy: 98,
        voiceConfidence: 97,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 0
    },
    {
        name: 'Daniel White',
        role: 'QA Engineer',
        techScore: 80,
        trustIndex: 92,
        logicAccuracy: 85,
        voiceConfidence: 94,
        status: 'Verified',
        color: 'text-green-400',
        incidents: 1
    }
];

export default function RecruiterDashboard() {
    const [candidateList, setCandidateList] = useState<any[]>([]);
    const [isLeaderboardView, setIsLeaderboardView] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
    const [shortlistedCandidate, setShortlistedCandidate] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real candidates from backend
    React.useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/exam/results');
                const data = await res.json();
                if (data.success) {
                    // Map backend data to UI fields
                    const mapped = data.data.map((res: any) => ({
                        _id: res._id,
                        name: res.studentName || res.studentEmail.split('@')[0],
                        email: res.studentEmail,
                        role: 'Tech Assessment Candidate',
                        techScore: res.totalScore,
                        trustIndex: res.isFlagged ? 45 : 98, // Simulated trust index
                        logicAccuracy: res.totalScore,
                        voiceConfidence: 90,
                        status: res.isFlagged ? 'Flagged' : 'Verified',
                        color: res.isFlagged ? 'text-red-400' : 'text-green-400',
                        incidents: res.identity_logs?.length || 0,
                        identity_logs: res.identity_logs?.map((l: any) => ({
                            ...l,
                            issue: l.detectedIssue || 'none',
                            reason: l.reason || ''
                        })) || [],
                        masterSelfie: res.masterSnapshot || null
                    }));
                    setCandidateList(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch results:", err);
                setCandidateList(INITIAL_CANDIDATES); // Fallback to demo data
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
        const interval = setInterval(fetchResults, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const handleReject = (name: string) => {
        setCandidateList(prev => prev.filter(c => c.name !== name));
    };

    const displayedCandidates = isLeaderboardView
        ? [...candidateList].sort((a, b) => {
            if (b.techScore !== a.techScore) return b.techScore - a.techScore;
            return b.trustIndex - a.trustIndex;
        })
        : candidateList;

    const averageTrust = candidateList.length > 0
        ? (candidateList.reduce((acc, c) => acc + c.trustIndex, 0) / candidateList.length).toFixed(1)
        : "0";

    const flaggedCount = candidateList.filter(c => c.status === 'Flagged').length;

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
                    <button
                        onClick={() => setIsLeaderboardView(!isLeaderboardView)}
                        className={`${isLeaderboardView ? 'bg-blue-500/20 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'premium-gradient'} text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2`}
                    >
                        <BarChart3 size={18} />
                        {isLeaderboardView ? 'Show All Candidates' : 'View Leaderboard'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Candidates', value: candidateList.length.toString(), icon: ShieldCheck, color: 'text-blue-400', trend: '+12%' },
                    { label: 'Average Trust', value: `${averageTrust}%`, icon: BarChart3, color: 'text-green-400', trend: '+2.4%' },
                    { label: 'Logic Discrepancies', value: '8', icon: Brain, color: 'text-purple-400', trend: '-5%' },
                    { label: 'Security Flags', value: flaggedCount.toString(), icon: AlertTriangle, color: 'text-red-400', trend: 'Critical' },
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
                    <h2 className="text-xl font-bold">
                        {isLeaderboardView ? 'Performance Leaderboard' : 'Candidate Verification Matrix'}
                    </h2>
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
                            {displayedCandidates.map((candidate, i) => (
                                <tr key={i} className="hover:bg-white/[0.03] transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            {isLeaderboardView && (
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${i === 0 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' :
                                                    i === 1 ? 'bg-gray-300/20 border-gray-400 text-gray-300' :
                                                        i === 2 ? 'bg-amber-700/20 border-amber-800 text-amber-600' :
                                                            'bg-white/5 border-white/10 text-gray-500'
                                                    }`}>
                                                    #{i + 1}
                                                </div>
                                            )}
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
                                            <span className="text-sm font-bold text-gray-300">{candidate.logicAccuracy}</span>
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
                                        <div className="flex justify-end gap-2">
                                            <button
                                                title="View Security Timeline"
                                                onClick={() => setSelectedCandidate(candidate)}
                                                className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all shadow-sm shadow-blue-500/10"
                                            >
                                                <AlertTriangle size={18} />
                                            </button>
                                            <button
                                                title="Approve Candidate"
                                                onClick={() => setShortlistedCandidate(candidate)}
                                                className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-sm shadow-emerald-500/10"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                title="Reject Candidate"
                                                onClick={() => handleReject(candidate.name)}
                                                className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all shadow-sm shadow-red-500/10"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-8 py-5 border-t border-white/10 bg-white/[0.01] flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>
                        {isLeaderboardView
                            ? `Global Performance Rankings (Total Pool: ${candidateList.length})`
                            : `Showing ${candidateList.length} unique competency assessments`}
                    </span>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Behavioral Sync</span>
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Neural Logic Analysis</span>
                    </div>
                </div>
            </div>

            {/* Security Timeline Modal */}
            <AnimatePresence>
                {selectedCandidate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCandidate(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <ShieldCheck size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Security Timeline: {selectedCandidate.name}</h3>
                                        <p className="text-xs text-gray-500">{selectedCandidate.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCandidate(null)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto">
                                {selectedCandidate.identity_logs.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                            <Check className="text-emerald-400" size={32} />
                                        </div>
                                        <h4 className="text-white font-bold text-xl uppercase tracking-wider">No Security Incidents</h4>
                                        <p className="text-gray-500 text-sm mt-2">The candidate passed all periodic face-anchor checks.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-12">
                                        {selectedCandidate.identity_logs.map((log: any, idx: number) => (
                                            <div key={idx} className="space-y-6">
                                                <div className="flex items-center justify-between gap-4 w-full">
                                                    <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                                                        <AlertTriangle size={12} />
                                                        Incident: {new Date(log.timestamp).toLocaleTimeString()}
                                                    </div>

                                                    {log.issue && log.issue !== 'none' && (
                                                        <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                                                            {log.issue === 'multiple_people' ? 'Multiple People Detected' :
                                                                log.issue === 'face_covered' ? 'Face Obstructed' :
                                                                    log.issue === 'no_face' ? 'No Face Detected' :
                                                                        log.issue === 'cheat_material' ? 'Cheat Material Detected' : 'Identity Mismatch'}
                                                        </div>
                                                    )}

                                                    <div className="h-px flex-1 bg-white/5" />
                                                </div>

                                                <div className="grid grid-cols-2 gap-8 text-center pt-2">
                                                    <div className="space-y-4">
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Master Photo (Reference)</p>
                                                        <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden ring-4 ring-emerald-500/10">
                                                            {selectedCandidate.masterSelfie ? (
                                                                <img src={selectedCandidate.masterSelfie} alt="Master" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs italic">
                                                                    No Master Photo Found
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                                                            <CheckCircle2 size={12} className="text-emerald-500" />
                                                            Identity Anchor Point
                                                        </p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Failed Snapshot (Webcam)</p>
                                                        <div className="aspect-video bg-white/5 rounded-2xl border border-red-500/20 overflow-hidden ring-4 ring-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                                            <img src={log.snapshot} alt="Failed Snapshot" className="w-full h-full object-cover" />
                                                        </div>
                                                        <p className="text-[10px] text-red-400 font-bold flex flex-col items-center justify-center gap-1">
                                                            <div className="flex items-center gap-1">
                                                                <X size={12} />
                                                                Mismatch detected ({log.confidence}% confidence)
                                                            </div>
                                                            {log.reason && (
                                                                <span className="text-gray-500 font-medium italic mt-1 bg-white/5 px-2 py-0.5 rounded">
                                                                    Reason: {log.reason}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/20">
                                            <div className="flex gap-4">
                                                <div className="p-2 bg-red-400/10 rounded-xl h-fit">
                                                    <AlertTriangle className="text-red-400" size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-red-400 font-bold">Manual Review Required</h4>
                                                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                                                        Gemini's face-anchor system detected a person-switch during the test. Carefully compare the snapshots with the master photo. If the candidate is different, click the "Reject" button in the main panel.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Shortlist Success Modal */}
            <AnimatePresence>
                {shortlistedCandidate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShortlistedCandidate(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col"
                        >
                            <div className="p-8 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                                    <CheckCircle2 size={40} className="text-emerald-400" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{shortlistedCandidate.name}</h3>
                                <p className="text-gray-400 text-sm mb-8">{shortlistedCandidate.email}</p>

                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl w-full">
                                    <p className="text-emerald-300 font-medium leading-relaxed">
                                        "You have successfully qualified the online technical test and you are shortlisted for the next round"
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShortlistedCandidate(null)}
                                    className="mt-8 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
