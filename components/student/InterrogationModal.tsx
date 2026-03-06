import React, { useState, useEffect, useRef } from 'react';
import { useIntegrityStore } from '@/lib/store';
import { ShieldAlert, Mic, Send, Lock, Keyboard, Clipboard, Layout, CheckCircle, Star, AlertCircle, Target, RefreshCw } from 'lucide-react';
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
    const [isVerifying, setIsVerifying] = useState(false);
    const [aiFeedback, setAiFeedback] = useState<string | null>(null);
    const [aiIsCorrect, setAiIsCorrect] = useState<boolean | null>(null);
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
                        className="max-w-[600px] w-full glass border-white/10 p-6 text-center space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/50 shadow-2xl shadow-green-500/20 mb-2">
                            <CheckCircle size={32} className="text-green-500" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Integrity Report</h2>
                            <p className="text-gray-400 text-xs">Session Bio-Metric Correlation Complete</p>

                            <div className="flex justify-center gap-2 my-2">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.15 + 0.5, type: "spring" }}
                                    >
                                        <Star
                                            size={24}
                                            className={i < earnedStars ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "text-gray-700"}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                                {earnedScore}% Mastery Achieved
                            </p>
                            {earnedScore >= 50 && (
                                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1 animate-pulse">
                                    Next Stage Unlocked!
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="glass p-3 rounded-xl border-white/5 bg-white/[0.02] text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    <Keyboard size={12} className="text-blue-400" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Typed</span>
                                </div>
                                <p className="text-xl font-black text-white">{keystrokes}</p>
                                <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Keystrokes</p>
                            </div>
                            <div className="glass p-3 rounded-xl border-white/5 bg-white/[0.02] text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clipboard size={12} className="text-orange-400" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Pasted</span>
                                </div>
                                <p className="text-xl font-black text-white">{pasteCount}</p>
                                <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Events</p>
                            </div>
                            <div className="glass p-3 rounded-xl border-white/5 bg-white/[0.02] text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    <Layout size={12} className="text-red-400" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Tab Switches</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-black text-white">{tabSwitches}</p>
                                    <p className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${tabSwitches > 0 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                                        {tabSwitches === 0 ? 'Optimal' : 'Compromised'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI Verification Feedback Panel */}
                        {aiFeedback && aiIsCorrect === false && (
                            <div className="mt-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 text-left">
                                <div className="p-1.5 bg-red-500/20 rounded-lg shrink-0 mt-0.5">
                                    <AlertCircle size={14} className="text-red-400" />
                                </div>
                                <div>
                                    <h4 className="text-red-500 font-bold mb-1 text-xs">Code Needs Improvement</h4>
                                    <p className="text-[11px] text-red-400/80 leading-relaxed max-h-24 overflow-y-auto pr-2 custom-scrollbar">{aiFeedback}</p>
                                </div>
                            </div>
                        )}

                        {aiFeedback && aiIsCorrect === true && (
                            <div className="mt-3 bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 text-left">
                                <div className="p-1.5 bg-green-500/20 rounded-lg shrink-0 mt-0.5">
                                    <Target size={14} className="text-green-400" />
                                </div>
                                <div>
                                    <h4 className="text-green-500 font-bold mb-1 text-xs">Code Verified Successfully!</h4>
                                    <p className="text-[11px] text-green-400/80 leading-relaxed max-h-24 overflow-y-auto pr-2 custom-scrollbar">{aiFeedback}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex gap-3">
                            {aiIsCorrect === false ? (
                                <button
                                    onClick={() => {
                                        setInterrogationPending(false);
                                        onClose();
                                    }}
                                    className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl py-2.5 font-bold transition-all text-red-400 shadow-xl text-xs"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <RefreshCw size={14} />
                                        Return to Editor & Retry
                                    </div>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setInterrogationPending(false);
                                        onClose();
                                    }}
                                    className="w-full premium-gradient rounded-xl py-2.5 font-bold hover:opacity-90 transition-all text-white shadow-xl shadow-blue-500/20 text-xs"
                                >
                                    Return to Level Map
                                </button>
                            )}
                        </div>
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
                                        onClick={async () => {
                                            if (isVerifying) return;

                                            // Reset validation states
                                            setIsVerifying(true);
                                            setAiFeedback(null);
                                            setAiIsCorrect(null);

                                            try {
                                                const res = await fetch('/api/verify-code', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        code: submittedCode,
                                                        questionId: questionId,
                                                        language: "JavaScript" // Assuming currently active language, can be passed down later
                                                    })
                                                });

                                                const data = await res.json();

                                                if (res.ok) {
                                                    // Parse the functional score from the AI
                                                    const aiScore = Number(data.score) || 0;
                                                    const isFunctionallyCorrect = aiScore >= 50;

                                                    setAiIsCorrect(isFunctionallyCorrect);
                                                    setAiFeedback(data.feedback);

                                                    // 1. Calculate an integrity score modifier based on metrics
                                                    let integrityModifier = 100;
                                                    if (pasteCount > 0) integrityModifier -= (pasteCount * 15);
                                                    if (tabSwitches > 0) integrityModifier -= (tabSwitches * 10);
                                                    if (keystrokes < 20) integrityModifier -= 30; // Suspiciously low typing
                                                    if (answer.length < 10) integrityModifier -= 20; // Poor logic answer

                                                    integrityModifier = Math.max(0, Math.min(100, integrityModifier));

                                                    // 2. Blend AI code score with localized integrity modifiers (50/50 weighting)
                                                    const combinedScore = Math.floor(
                                                        (aiScore * 0.5) + (integrityModifier * 0.5)
                                                    );

                                                    // Only completely fail them if the AI says the code is incorrect
                                                    const finalScore = isFunctionallyCorrect ? Math.max(combinedScore, aiScore) : 0;

                                                    // 3. Calculate stars (1 star per 20%)
                                                    const stars = Math.ceil(finalScore / 20);

                                                    // 4. Find next question ID
                                                    const currentIndex = QUESTIONS.findIndex(q => q.id === questionId);
                                                    const nextQuestionId = currentIndex < QUESTIONS.length - 1 ? QUESTIONS[currentIndex + 1].id : null;

                                                    // 5. Update state
                                                    setEarnedScore(finalScore);
                                                    setEarnedStars(stars);

                                                    // Only unlock next level if score >= 50
                                                    if (finalScore >= 50) {
                                                        completeLevel(questionId, nextQuestionId, finalScore, stars);
                                                    } else {
                                                        // They failed either code or integrity check, mark as completed but without next unlock
                                                        completeLevel(questionId, null, finalScore, stars);
                                                    }
                                                    setIsSubmitted(true);
                                                } else {
                                                    setAiIsCorrect(false);
                                                    setAiFeedback(data.error || "An error occurred verifying your code.");
                                                    setIsSubmitted(true);
                                                }
                                            } catch (err) {
                                                console.error("Verification error:", err);
                                                setAiIsCorrect(false);
                                                setAiFeedback("Network error verifying code. Make sure you have GEMINI_API_KEY in .env.local");
                                                setIsSubmitted(true);
                                            } finally {
                                                setIsVerifying(false);
                                            }
                                        }}
                                        disabled={isVerifying}
                                        className={`flex-1 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-all shadow-lg shadow-blue-500/10 ${isVerifying ? 'bg-blue-500/50 cursor-not-allowed opacity-70 border border-blue-500/20' : 'premium-gradient hover:opacity-90'
                                            }`}
                                    >
                                        {isVerifying ? (
                                            <div className="flex justify-center items-center gap-3">
                                                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                                                <span>Validating...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Send size={18} />
                                                Verify & Submit
                                            </div>
                                        )}
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
