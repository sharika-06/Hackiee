import React, { useState, useEffect, useRef } from 'react';
import { useIntegrityStore } from '@/lib/store';
import { ShieldAlert, Mic, Send, Lock, Keyboard, Clipboard, Layout, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '@/lib/questions';

interface InterrogationModalProps {
    isOpen: boolean;
    onClose: () => void;
    submittedCode: string;
    questionId: string;
    keystrokes: number;
}

export default function InterrogationModal({
    isOpen,
    onClose,
    submittedCode,
    questionId,
    keystrokes
}: InterrogationModalProps) {
    const {
        tabSwitches,
        pasteCount,
        isInterrogationPending,
        setInterrogationPending,
        levels,
        completeLevel
    } = useIntegrityStore();

    const [answer, setAnswer] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [earnedStars, setEarnedStars] = useState(0);
    const [earnedScore, setEarnedScore] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);

    const currentQuestion = QUESTIONS.find(q => q.id === questionId) || QUESTIONS[0];

    // Security: MutationObserver to detect if modal is removed from DOM
    useEffect(() => {
        if (!isOpen) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node === modalRef.current) {
                        console.error('Security Breach: Modal removed from DOM!');
                        setIsLocked(true);
                        // In a real app, we would notify the backend here
                    }
                });
            });
        });

        if (modalRef.current?.parentElement) {
            observer.observe(modalRef.current.parentElement, { childList: true });
        }

        return () => observer.disconnect();
    }, [isOpen]);

    if (!isOpen) return null;

    if (isLocked) {
        return (
            <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
                <div className="max-w-md w-full glass border-red-500/50 p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto border border-red-500/50">
                        <Lock size={32} className="text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-500">Security Lockout</h2>
                    <p className="text-gray-400">
                        An attempt to bypass the verification process was detected. Your IDE has been locked and this incident has been reported.
                    </p>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <AnimatePresence>
                <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full glass border-white/10 p-8 text-center space-y-8"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/50 shadow-2xl shadow-green-500/20 mb-4">
                            <CheckCircle size={40} className="text-green-500" />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Integrity Report</h2>
                            <p className="text-gray-400 text-sm">Session Bio-Metric Correlation Complete</p>

                            <div className="flex justify-center gap-2 my-4">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.15 + 0.5, type: "spring" }}
                                    >
                                        <Star
                                            size={32}
                                            className={i < earnedStars ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "text-gray-700"}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                                {earnedScore}% Mastery Achieved
                            </p>
                            {earnedScore >= 50 && (
                                <p className="text-xs text-green-400 font-bold uppercase tracking-widest mt-2 animate-pulse">
                                    Next Stage Unlocked!
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass p-4 rounded-2xl border-white/5 bg-white/[0.02] text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Keyboard size={14} className="text-blue-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Typed</span>
                                </div>
                                <p className="text-2xl font-black text-white">{keystrokes}</p>
                                <p className="text-[9px] text-gray-600 font-bold uppercase mt-1">Keystrokes</p>
                            </div>
                            <div className="glass p-4 rounded-2xl border-white/5 bg-white/[0.02] text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clipboard size={14} className="text-orange-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pasted</span>
                                </div>
                                <p className="text-2xl font-black text-white">{pasteCount}</p>
                                <p className="text-[9px] text-gray-600 font-bold uppercase mt-1">Events</p>
                            </div>
                            <div className="glass p-4 rounded-2xl border-white/5 bg-white/[0.02] text-left col-span-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Layout size={14} className="text-red-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tab Switches</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-2xl font-black text-white">{tabSwitches}</p>
                                    <p className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase ${tabSwitches > 0 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                                        {tabSwitches === 0 ? 'Optimal' : 'Compromised'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setInterrogationPending(false);
                                onClose();
                            }}
                            className="w-full premium-gradient rounded-xl py-4 font-bold hover:opacity-90 transition-all text-white shadow-xl shadow-blue-500/20"
                        >
                            Return to Level Map
                        </button>
                    </motion.div>
                </div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="max-w-2xl w-full glass border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <div className="premium-gradient p-1">
                        <div className="bg-[#0a0a0a] rounded-[15px] p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <ShieldAlert size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">AI Integrity Verification</h2>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Step 2 of 2: Logic Validation</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <ShieldAlert size={80} className="text-blue-400" />
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3">Contextual Logic Check: {currentQuestion.title}</p>
                                    <p className="text-lg text-white font-bold leading-tight relative z-10">
                                        "{currentQuestion.interrogationQuestion}"
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 pl-1">Your Explanation (Voice or Text)</label>
                                    <textarea
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-inner"
                                        placeholder="Type your explanation here to verify authorship..."
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-all">
                                        <Mic size={18} className="text-blue-400" />
                                        Use Voice Explanation
                                    </button>
                                    <button
                                        onClick={() => {
                                            // 1. Calculate a mock score based on metrics
                                            let calculatedScore = 100;
                                            if (pasteCount > 0) calculatedScore -= (pasteCount * 15);
                                            if (tabSwitches > 0) calculatedScore -= (tabSwitches * 10);
                                            if (keystrokes < 20) calculatedScore -= 30; // Suspiciously low typing
                                            if (answer.length < 10) calculatedScore -= 20; // Poor logic answer

                                            calculatedScore = Math.max(0, Math.min(100, calculatedScore));

                                            // 2. Calculate stars (1 star per 20%)
                                            const stars = Math.ceil(calculatedScore / 20);

                                            // 3. Find next question ID
                                            const currentIndex = QUESTIONS.findIndex(q => q.id === questionId);
                                            const nextQuestionId = currentIndex < QUESTIONS.length - 1 ? QUESTIONS[currentIndex + 1].id : null;

                                            // 4. Update state
                                            setEarnedScore(calculatedScore);
                                            setEarnedStars(stars);
                                            completeLevel(questionId, nextQuestionId, calculatedScore, stars);
                                            setIsSubmitted(true);
                                        }}
                                        className="flex-1 premium-gradient rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/10"
                                    >
                                        <Send size={18} />
                                        Verify & Submit
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Bio-Metric Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Gemini Logic Analysis</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
