'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useIntegrityStore } from '@/lib/store';
import { Code, Shield, Send, Fingerprint, BookOpen, ChevronRight, Lock, Star, ArrowLeft } from 'lucide-react';
import SkillChart from '@/components/student/SkillChart';
import InterrogationModal from '@/components/student/InterrogationModal';
import { QUESTIONS, Question } from '@/lib/questions';

const LANGUAGES = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'c', name: 'C' },
];

export default function StudentDashboard() {
    const [view, setView] = useState<'map' | 'editor'>('map');
    const [currentQuestionId, setCurrentQuestionId] = useState(QUESTIONS[0].id);
    const [language, setLanguage] = useState<keyof Question['templates']>('javascript');
    const [keystrokes, setKeystrokes] = useState(0);

    // Find the current question object
    const currentQuestion = QUESTIONS.find(q => q.id === currentQuestionId) || QUESTIONS[0];

    const [code, setCode] = useState(currentQuestion.templates[language]);

    // Update code template when question or language changes
    useEffect(() => {
        setCode(currentQuestion.templates[language]);
    }, [currentQuestionId, language]);

    const {
        tabSwitches,
        pasteCount,
        isInterrogationPending,
        score,
        levels,
        incrementTabSwitches,
        incrementPasteCount,
        setInterrogationPending
    } = useIntegrityStore();

    const [isClient, setIsClient] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                incrementTabSwitches();
            }
        };

        const handlePaste = (e: ClipboardEvent) => {
            incrementPasteCount();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
                setKeystrokes(prev => prev + 1);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('paste', handlePaste);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('paste', handlePaste);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [incrementTabSwitches, incrementPasteCount]);

    const handleLanguageChange = (newLang: keyof Question['templates']) => {
        setLanguage(newLang);
    };

    const handleQuestionChange = (id: string) => {
        if (!levels[id]?.isUnlocked) return;
        setCurrentQuestionId(id);
        setView('editor');
    };

    const handleSubmit = () => {
        setShowModal(true);
        setInterrogationPending(true);
    };

    // Callback when modal finishes validation to return to map
    const handleCloseModal = () => {
        setShowModal(false);
        setView('map');
    };

    if (!isClient) return null;

    if (view === 'map') {
        return (
            <div className="min-h-[calc(100vh-73px)] bg-[#050505] p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-4 drop-shadow-lg">
                            Neural Assessment Stages
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Prove your competency to unlock subsequent levels. Achieve at least 50% technical mastery to proceed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {QUESTIONS.map((q, index) => {
                            const levelData = levels[q.id];
                            const isLocked = !levelData?.isUnlocked;
                            const isCompleted = levelData?.isCompleted;
                            const stars = levelData?.stars || 0;

                            return (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuestionChange(q.id)}
                                    disabled={isLocked}
                                    className={`relative p-8 rounded-3xl text-left transition-all duration-300 group ${isLocked
                                        ? 'bg-white/[0.02] border border-white/5 opacity-60 cursor-not-allowed'
                                        : isCompleted
                                            ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 cursor-pointer'
                                            : 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]'
                                        }`}
                                >
                                    {isLocked && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] rounded-3xl">
                                            <div className="bg-black/50 p-4 rounded-full border border-white/10 shadow-2xl">
                                                <Lock size={24} className="text-gray-400" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative z-0">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${isLocked ? 'bg-white/5 text-gray-500' : isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                Stage {index + 1}
                                            </div>

                                            {/* Stars Display */}
                                            {isCompleted && (
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-700"}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                                            {q.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                            {q.description}
                                        </p>

                                        {isCompleted && (
                                            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                                                <span className="text-xs text-green-400/70 font-bold tracking-wider uppercase">Mastery Level</span>
                                                <span className="text-lg font-black text-white">{levelData.score}%</span>
                                            </div>
                                        )}
                                        {!isCompleted && !isLocked && (
                                            <div className="mt-6 flex items-center text-blue-400 font-bold text-sm gap-2 group-hover:translate-x-1 transition-transform">
                                                Initialize Challenge <ChevronRight size={16} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-73px)] overflow-hidden bg-[#050505]">
            <InterrogationModal
                isOpen={showModal}
                onClose={handleCloseModal}
                submittedCode={code}
                questionId={currentQuestionId}
                keystrokes={keystrokes}
            />

            {/* Questions Side Sidebar - Optional now, but useful for quick navigation within editor */}
            <aside className="w-80 border-r border-white/5 bg-[#0a0a0a]/50 flex flex-col hidden lg:flex">
                <div className="p-6 border-b border-white/5 pb-4">
                    <button
                        onClick={() => setView('map')}
                        className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 mb-6 group transition-colors"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Map
                    </button>
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-400" />
                        Assessments
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {QUESTIONS.map((q) => {
                        const isLocked = !levels[q.id]?.isUnlocked;
                        return (
                            <button
                                key={q.id}
                                disabled={isLocked}
                                onClick={() => handleQuestionChange(q.id)}
                                className={`w-full p-4 rounded-2xl text-left transition-all group flex items-center justify-between gap-3 ${isLocked
                                    ? 'opacity-40 cursor-not-allowed hidden lg:flex'
                                    : currentQuestionId === q.id
                                        ? 'bg-blue-500/10 border border-blue-500/20 flex'
                                        : 'hover:bg-white/[0.02] border border-transparent flex'
                                    }`}
                            >
                                <div className="space-y-1 overflow-hidden pr-2">
                                    <p className={`text-sm font-bold flex items-center gap-2 truncate ${currentQuestionId === q.id ? 'text-blue-400' : 'text-gray-300'}`}>
                                        {q.title}
                                        {levels[q.id]?.isCompleted && <Star size={10} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                                    </p>
                                    <p className={`text-[10px] ${isLocked ? 'text-gray-600' : 'text-gray-500'} line-clamp-1`}>
                                        {q.id.split('-').join(' ')}
                                    </p>
                                </div>
                                {isLocked ? (
                                    <Lock size={14} className="text-gray-600 flex-shrink-0" />
                                ) : (
                                    <ChevronRight size={14} className={`${currentQuestionId === q.id ? 'text-blue-400' : 'text-gray-700 opacity-0 group-hover:opacity-100'} transition-all flex-shrink-0`} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col gap-6 p-6 overflow-hidden">
                <div className="flex justify-between items-end shrink-0">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl font-bold text-white mb-2 text-gradient">{currentQuestion.title}</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {currentQuestion.description}
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="premium-gradient hover:opacity-90 transition-all px-8 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-blue-500/20 group shrink-0"
                    >
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Submit Solution
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                    <div className="lg:col-span-3 rounded-3xl overflow-hidden glass border border-white/10 flex flex-col">
                        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                        <Code size={16} className="text-blue-400" />
                                    </div>
                                    <span className="font-bold tracking-tight">main.{currentQuestion.extension[language]}</span>
                                </div>

                                <div className="h-6 w-px bg-white/10" />

                                <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/5">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.id}
                                            onClick={() => handleLanguageChange(lang.id as keyof Question['templates'])}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${language === lang.id
                                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                                : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse outline outline-4 outline-green-500/20" />
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Live Bio-Metrics</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Editor
                                height="100%"
                                language={language}
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                onMount={(editor) => {
                                    editor.onDidPaste(() => {
                                        incrementPasteCount();
                                    });
                                }}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 15,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 20, bottom: 20 },
                                    fontFamily: 'var(--font-geist-mono)',
                                    renderLineHighlight: 'all',
                                    cursorSmoothCaretAnimation: 'on',
                                    smoothScrolling: true,
                                    contextmenu: false,
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-6 overflow-y-auto pr-1">
                        <div className="glass p-6 rounded-3xl border border-white/10">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Fingerprint size={14} className="text-blue-400" />
                                Neural Skill Analytics
                            </h3>
                            {(() => {
                                const isCompleted = levels[currentQuestionId]?.isCompleted;
                                const finalScore = levels[currentQuestionId]?.score || 0;

                                // Safe-check the code string since template might be loading initially
                                const currentCode = code || '';

                                // Real-time simulated heuristics
                                const currentCodeLength = currentCode.length;
                                const structureElements = (currentCode.match(/[{}[\]();=+\-*/]/g) || []).length;

                                // Dynamic logic (Accuracy) goes up as they write more code, maxing near 95 before verification
                                const liveLogic = Math.min(95, 20 + Math.floor(currentCodeLength / 4) + (structureElements * 2));

                                // Dynamic performance (Efficiency) fluctuates. Too many keystrokes drops it locally.
                                const livePerformance = Math.max(30, Math.min(98, 100 - Math.floor(keystrokes / 15) + structureElements));

                                // Dynamic syntax goes up as they add structural elements
                                const liveSyntax = Math.min(96, 40 + (structureElements * 3));

                                // AI Independence drops immediately if they paste or switch tabs
                                const liveIndependence = Math.max(0, 100 - (pasteCount * 25) - (tabSwitches * 15));

                                const chartData = {
                                    syntax: isCompleted ? Math.min(100, finalScore + 10) : liveSyntax,
                                    logic: isCompleted ? finalScore : liveLogic,
                                    performance: isCompleted ? Math.min(100, finalScore + 5) : livePerformance,
                                    aiIndependence: isCompleted ? Math.max(0, 100 - (pasteCount * 15) - (tabSwitches * 10)) : liveIndependence
                                };

                                return (
                                    <>
                                        <SkillChart data={chartData} />
                                        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Accuracy</p>
                                                <p className={`text-xl font-black ${isCompleted ? 'text-white' : 'text-blue-400/80 animate-pulse'}`}>
                                                    {isCompleted ? `${chartData.logic}%` : `${Math.round(chartData.logic)}%`}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Efficiency</p>
                                                <p className={`text-xl font-black ${isCompleted ? 'text-white' : 'text-blue-400/80 animate-pulse'}`}>
                                                    {isCompleted ? `${chartData.performance}%` : `${Math.round(chartData.performance)}%`}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        <div className="glass p-6 rounded-3xl border border-white/10">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Shield size={14} className="text-blue-400" />
                                Integrity Metrics
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Tab Switches</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-tighter ${tabSwitches > 0 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                                            {tabSwitches} Events
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 transition-all duration-700 ease-out"
                                            style={{ width: `${Math.min(tabSwitches * 20, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Paste Events</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-tighter ${pasteCount > 0 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                                            {pasteCount} Events
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 transition-all duration-700 ease-out"
                                            style={{ width: `${Math.min(pasteCount * 25, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl border border-white/10 bg-blue-500/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-110 transition-transform">
                                <Shield size={40} className="text-blue-400" />
                            </div>
                            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Security Protocol</h3>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                VeriSkill AI is active. Analyzing behavioral patterns, environment integrity, and neural logic consistency.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
