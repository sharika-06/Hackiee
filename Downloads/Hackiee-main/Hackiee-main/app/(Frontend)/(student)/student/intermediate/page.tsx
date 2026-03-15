'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useIntegrityStore } from '@/lib/store';
import { Code, Shield, Send, Fingerprint, BookOpen, ChevronRight, Lock, Star, ArrowLeft, Layers } from 'lucide-react';
import SkillChart from '@/components/student/SkillChart';
import InterrogationModal from '@/components/student/InterrogationModal';
import { INTERMEDIATE_QUESTIONS, Question } from '@/lib/questions';
import Link from 'next/link';

const LANGUAGES = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'c', name: 'C' },
];

export default function IntermediateDashboard() {
    const [view, setView] = useState<'map' | 'editor'>('map');
    const [currentQuestionId, setCurrentQuestionId] = useState(INTERMEDIATE_QUESTIONS[0].id);
    const [language, setLanguage] = useState<keyof Question['templates']>('javascript');
    const [keystrokes, setKeystrokes] = useState(0);

    const currentQuestion = INTERMEDIATE_QUESTIONS.find(q => q.id === currentQuestionId) || INTERMEDIATE_QUESTIONS[0];
    const [code, setCode] = useState(currentQuestion.templates[language]);

    useEffect(() => { setCode(currentQuestion.templates[language]); }, [currentQuestionId, language]);

    const { tabSwitches, pasteCount, score, levels, incrementTabSwitches, incrementPasteCount, setInterrogationPending } = useIntegrityStore();
    const [isClient, setIsClient] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const onVisibility = () => { if (document.visibilityState === 'hidden') incrementTabSwitches(); };
        const onPaste = () => incrementPasteCount();
        const onKey = (e: KeyboardEvent) => {
            if (e.key.length === 1 || ['Backspace', 'Delete', 'Enter'].includes(e.key)) setKeystrokes(p => p + 1);
        };
        document.addEventListener('visibilitychange', onVisibility);
        document.addEventListener('paste', onPaste);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
            document.removeEventListener('paste', onPaste);
            document.removeEventListener('keydown', onKey);
        };
    }, [incrementTabSwitches, incrementPasteCount]);

    if (!isClient) return null;

    if (view === 'map') {
        return (
            <div className="min-h-[calc(100vh-73px)] bg-[#050505] p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-4">
                        <Link href="/level-select" className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                            <ArrowLeft size={14} /> Back to Level Select
                        </Link>
                    </div>
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                            <Layers size={12} /> Intermediate · Patterns & Series
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
                            Pattern Recognition Stages
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Series, digit manipulation, and mathematical pattern challenges. Prove your analytical problem-solving ability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {INTERMEDIATE_QUESTIONS.map((q, index) => {
                            const levelData = levels[q.id];
                            const isLocked = index > 0 && !levels[INTERMEDIATE_QUESTIONS[index - 1].id]?.isCompleted;
                            const isCompleted = levelData?.isCompleted;
                            const stars = levelData?.stars || 0;

                            return (
                                <button
                                    key={q.id}
                                    onClick={() => { if (!isLocked) { setCurrentQuestionId(q.id); setView('editor'); } }}
                                    disabled={isLocked}
                                    className={`relative p-8 rounded-3xl text-left transition-all duration-300 group ${isLocked
                                        ? 'bg-white/[0.02] border border-white/5 opacity-60 cursor-not-allowed'
                                        : isCompleted
                                            ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 cursor-pointer'
                                            : 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                                        }`}
                                >
                                    {isLocked && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] rounded-3xl">
                                            <div className="bg-black/50 p-4 rounded-full border border-white/10"><Lock size={24} className="text-gray-400" /></div>
                                        </div>
                                    )}
                                    <div className="relative z-0">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${isLocked ? 'bg-white/5 text-gray-500' : isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                Stage {index + 1}
                                            </div>
                                            {isCompleted && (
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />)}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-gray-500' : 'text-white'}`}>{q.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{q.description}</p>
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
            <InterrogationModal isOpen={showModal} onClose={() => { setShowModal(false); setView('map'); }} submittedCode={code} questionId={currentQuestionId} keystrokes={keystrokes} />

            <aside className="w-80 border-r border-white/5 bg-[#0a0a0a]/50 flex-col hidden lg:flex">
                <div className="p-6 border-b border-white/5 pb-4">
                    <button onClick={() => setView('map')} className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 mb-6 group transition-colors">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Map
                    </button>
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-400" /> Intermediate
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {INTERMEDIATE_QUESTIONS.map((q, idx) => {
                        const isLocked = idx > 0 && !levels[INTERMEDIATE_QUESTIONS[idx - 1].id]?.isCompleted;
                        return (
                            <button key={q.id}
                                disabled={isLocked}
                                onClick={() => !isLocked && setCurrentQuestionId(q.id)}
                                className={`w-full p-4 rounded-2xl text-left transition-all group flex items-center justify-between gap-3 ${isLocked
                                        ? 'opacity-40 cursor-not-allowed border border-transparent'
                                        : currentQuestionId === q.id
                                            ? 'bg-blue-500/10 border border-blue-500/20'
                                            : 'hover:bg-white/[0.02] border border-transparent'
                                    }`}>
                                <div className="space-y-1 overflow-hidden pr-2">
                                    <p className={`text-sm font-bold truncate ${currentQuestionId === q.id ? 'text-blue-400' : 'text-gray-300'}`}>{q.title}</p>
                                </div>
                                {isLocked
                                    ? <Lock size={14} className="text-gray-600 flex-shrink-0" />
                                    : <ChevronRight size={14} className="text-gray-700 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                                }
                            </button>
                        );
                    })}
                </div>
            </aside>

            <div className="flex-1 flex flex-col gap-6 p-6 overflow-hidden">
                <div className="flex justify-between items-end shrink-0">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl font-bold text-white mb-2 text-gradient">{currentQuestion.title}</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">{currentQuestion.description}</p>
                    </div>
                    <button onClick={() => { setShowModal(true); setInterrogationPending(true); }}
                        className="premium-gradient hover:opacity-90 transition-all px-8 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-blue-500/20 group shrink-0">
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Submit Solution
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                    <div className="lg:col-span-3 rounded-3xl overflow-hidden glass border border-white/10 flex flex-col">
                        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20"><Code size={16} className="text-blue-400" /></div>
                                    <span className="font-bold">main.{currentQuestion.extension[language]}</span>
                                </div>
                                <div className="h-6 w-px bg-white/10" />
                                <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/5">
                                    {LANGUAGES.map(lang => (
                                        <button key={lang.id} onClick={() => setLanguage(lang.id as keyof Question['templates'])}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${language === lang.id ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse outline outline-4 outline-green-500/20" />
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Live Bio-Metrics</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Editor height="100%" language={language} theme="vs-dark" value={code} onChange={v => setCode(v || '')}
                                options={{ minimap: { enabled: false }, fontSize: 15, lineNumbers: 'on', scrollBeyondLastLine: false, automaticLayout: true, padding: { top: 20, bottom: 20 }, fontFamily: 'var(--font-geist-mono)', contextmenu: false }} />
                        </div>
                    </div>

                    <div className="space-y-6 overflow-y-auto pr-1">
                        <div className="glass p-6 rounded-3xl border border-white/10">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Fingerprint size={14} className="text-blue-400" /> Neural Skill Analytics
                            </h3>
                            <SkillChart data={{
                                syntax: Math.min(96, 40 + ((code.match(/[{}[\]();=+\-*/]/g) || []).length * 3)),
                                logic: Math.min(95, 20 + Math.floor(code.length / 4)),
                                performance: Math.max(30, Math.min(98, 100 - Math.floor(keystrokes / 15))),
                                aiIndependence: Math.max(0, 100 - pasteCount * 25 - tabSwitches * 15)
                            }} />
                        </div>
                        <div className="glass p-6 rounded-3xl border border-white/10">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Shield size={14} className="text-blue-400" /> Integrity Metrics
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1"><span className="text-xs text-gray-400 font-bold uppercase">Tab Switches</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${tabSwitches > 0 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>{tabSwitches}</span></div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500 transition-all" style={{ width: `${Math.min(tabSwitches * 20, 100)}%` }} /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1"><span className="text-xs text-gray-400 font-bold uppercase">Paste Events</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${pasteCount > 0 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>{pasteCount}</span></div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-500 transition-all" style={{ width: `${Math.min(pasteCount * 25, 100)}%` }} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
