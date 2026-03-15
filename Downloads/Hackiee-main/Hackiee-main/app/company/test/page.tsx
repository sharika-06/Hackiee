'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
    Clock,
    ChevronRight,
    Send,
    AlertCircle,
    CheckCircle2,
    Terminal,
    Code2,
    Maximize2,
    Lock,
    AlertTriangle,
    User,
    ShieldAlert,
    Users
} from 'lucide-react';

const LANGUAGES = [
    { id: 'javascript', name: 'JavaScript', icon: 'JS' },
    { id: 'python', name: 'Python', icon: 'PY' },
    { id: 'cpp', name: 'C++', icon: 'C++' },
    { id: 'c', name: 'C', icon: 'C' },
    { id: 'java', name: 'Java', icon: 'JV' },
];

const LEVELS = [
    {
        id: 1,
        title: "Level 1: Hello World",
        description: "Write a function that returns or prints the string 'Hello World'.",
        boilerplates: {
            javascript: "function solution() {\n  return \"Hello World\";\n}",
            python: "def solution():\n    return \"Hello World\"",
            cpp: "#include <iostream>\n#include <string>\n\nstd::string solution() {\n    return \"Hello World\";\n}",
            c: "#include <stdio.h>\n\nchar* solution() {\n    return \"Hello World\";\n}",
            java: "public class Solution {\n    public String solution() {\n        return \"Hello World\";\n    }\n}"
        },
        test: (code: string, lang: string) => {
            if (lang === 'javascript') {
                try {
                    const fn = new Function(`return ${code}`)();
                    return fn() === "Hello World";
                } catch { return false; }
            }
            return code.includes("Hello World"); // Simple placeholder check for demo
        },
        hint: "Expected output: 'Hello World'",
        verification: {
            question: "In the code you just wrote, what is the purpose of the 'return' keyword?",
            options: [
                "To output a value from the function",
                "To stop the whole program",
                "To declare a new variable",
                "To print text to the console"
            ],
            correctAnswer: 0
        }
    },
    {
        id: 2,
        title: "Level 2: Odd or Even",
        description: "Write a function that takes a number and returns 'Even' if it's even, and 'Odd' otherwise.",
        boilerplates: {
            javascript: "function solution(num) {\n  return num % 2 === 0 ? \"Even\" : \"Odd\";\n}",
            python: "def solution(num):\n    return \"Even\" if num % 2 == 0 else \"Odd\"",
            cpp: "#include <string>\n\nstd::string solution(int num) {\n    return (num % 2 == 0) ? \"Even\" : \"Odd\";\n}",
            c: "#include <string.h>\n\nchar* solution(int num) {\n    return (num % 2 == 0) ? \"Even\" : \"Odd\";\n}",
            java: "public class Solution {\n    public String solution(int num) {\n        return (num % 2 == 0) ? \"Even\" : \"Odd\";\n    }\n}"
        },
        test: (code: string, lang: string) => {
            if (lang === 'javascript') {
                try {
                    const fn = new Function(`return ${code}`)();
                    return fn(2) === "Even" && fn(3) === "Odd";
                } catch { return false; }
            }
            return code.includes("% 2") || code.includes("mod");
        },
        hint: "Use the modulo operator (%)",
        verification: {
            question: "What does the expression 'n % 2 === 0' specifically check for?",
            options: [
                "If n is a prime number",
                "If n is perfectly divisible by 2",
                "If n is greater than zero",
                "If n is a decimal number"
            ],
            correctAnswer: 1
        }
    },
    {
        id: 3,
        title: "Level 3: Palindrome",
        description: "Write a function that checks if a given string is a palindrome. Return true or false.",
        boilerplates: {
            javascript: "function solution(str) {\n  const rev = str.split('').reverse().join('');\n  return str === rev;\n}",
            python: "def solution(s):\n    return s == s[::-1]",
            cpp: "#include <string>\n#include <algorithm>\n\nbool solution(std::string s) {\n    std::string rev = s;\n    std::reverse(rev.begin(), rev.end());\n    return s == rev;\n}",
            c: "#include <stdbool.h>\n#include <string.h>\n\nbool solution(char* s) {\n    // check palindrome logic\n}",
            java: "public class Solution {\n    public boolean solution(String s) {\n        String rev = new StringBuilder(s).reverse().toString();\n        return s.equals(rev);\n    }\n}"
        },
        test: (code: string, lang: string) => {
            if (lang === 'javascript') {
                try {
                    const fn = new Function(`return ${code}`)();
                    return fn("madam") === true && fn("hello") === false;
                } catch { return false; }
            }
            return true; // Simplified
        },
        hint: "A palindrome reads the same backwards as forwards.",
        verification: {
            question: "Why is reversing the string a common technique to check for a palindrome?",
            options: [
                "To make the code look more complex",
                "Because palindromes are identical when reversed",
                "To save memory during execution",
                "To convert the string into an array"
            ],
            correctAnswer: 1
        }
    },
    {
        id: 4,
        title: "Level 4: Fibonacci series",
        description: "Write a function that returns the nth number in the Fibonacci sequence.",
        boilerplates: {
            javascript: "function solution(n) {\n  if (n <= 1) return n;\n  return solution(n-1) + solution(n-2);\n}",
            python: "def solution(n):\n    if n <= 1: return n\n    return solution(n-1) + solution(n-2)",
            cpp: "int solution(int n) {\n    if (n <= 1) return n;\n    return solution(n-1) + solution(n-2);\n}",
            c: "int solution(int n) {\n    if (n <= 1) return n;\n    return solution(n-1) + solution(n-2);\n}",
            java: "public class Solution {\n    public int solution(int n) {\n        if (n <= 1) return n;\n        return solution(n-1) + solution(n-2);\n    }\n}"
        },
        test: (code: string, lang: string) => {
            if (lang === 'javascript') {
                try {
                    const fn = new Function(`return ${code}`)();
                    return fn(5) === 5;
                } catch { return false; }
            }
            return true;
        },
        hint: "F(n) = F(n-1) + F(n-2)",
        verification: {
            question: "In your Fibonacci implementation, what are the 'base cases' usually used for?",
            options: [
                "To handle the very first numbers (0 or 1) and stop recursion",
                "To calculate the average of the sequence",
                "To store the results in a database",
                "To generate random numbers"
            ],
            correctAnswer: 0
        }
    },
    {
        id: 5,
        title: "Level 5: Factorial",
        description: "Write a function that returns the factorial of a given number n.",
        boilerplates: {
            javascript: "function solution(n) {\n  if (n === 0) return 1;\n  return n * solution(n-1);\n}",
            python: "def solution(n):\n    if n == 0: return 1\n    return n * solution(n-1)",
            cpp: "int solution(int n) {\n    if (n == 0) return 1;\n    return n * solution(n-1);\n}",
            c: "int solution(int n) {\n    if (n == 0) return 1;\n    return n * solution(n-1);\n}",
            java: "public class Solution {\n    public int solution(int n) {\n        if (n == 0) return 1;\n        return n * solution(n-1);\n    }\n}"
        },
        test: (code: string, lang: string) => {
            if (lang === 'javascript') {
                try {
                    const fn = new Function(`return ${code}`)();
                    return fn(5) === 120;
                } catch { return false; }
            }
            return true;
        },
        hint: "n! = n * (n-1) * ... * 1",
        verification: {
            question: "If n=4, what is the mathematical expression for its factorial?",
            options: [
                "4 + 3 + 2 + 1",
                "4 * 3 * 2 * 1",
                "4 * 4 * 4 * 4",
                "4 / 1"
            ],
            correctAnswer: 1
        }
    }
];

export default function CodingTest() {
    const router = useRouter();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(LEVELS[0].boilerplates.javascript);
    const [time, setTime] = useState(1800); // 30 minutes
    const [isFullScreen, setIsFullScreen] = useState(true); // Default to true to prevent flicker
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [violations, setViolations] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [suspicionScore, setSuspicionScore] = useState(0);
    const [pasteCount, setPasteCount] = useState(0);
    const [startTime] = useState(Date.now());
    const [lastEditTime, setLastEditTime] = useState(Date.now());
    const containerRef = useRef<HTMLDivElement>(null);
    const [problemResults, setProblemResults] = useState<{ problemId: string; score: number; timeTaken: number; answeredCorrectly: boolean; codeCorrect?: boolean }[]>([]);
    const hasSubmittedRef = useRef(false);

    // Face Proctoring States & Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [masterSelfie, setMasterSelfie] = useState<string | null>(null);
    const [identityLogs, setIdentityLogs] = useState<any[]>([]);
    const [proctoringStatus, setProctoringStatus] = useState<'ok' | 'warning' | 'error'>('ok');
    const [proctoringMessage, setProctoringMessage] = useState<string>('System Secure');
    const [showMultiplePeopleWarning, setShowMultiplePeopleWarning] = useState(false);
    const [showIdentityWarning, setShowIdentityWarning] = useState(false);

    // Load master selfie from localStorage if it exists (uploaded during login)
    useEffect(() => {
        const saved = localStorage.getItem('masterSelfie');
        if (saved) setMasterSelfie(saved);
    }, []);

    // Submit results to backend
    const submitResultsToBackend = async (finalProblems: typeof problemResults, finalSuspicion: number, finalLevel: number, totalTime: number) => {
        if (hasSubmittedRef.current) return;
        hasSubmittedRef.current = true;

        const studentEmail = localStorage.getItem('userEmail') || 'unknown@exam.portal';
        const studentName = localStorage.getItem('studentName') || 'Unknown Student';
        const examId = localStorage.getItem('examId') || 'HACKATHON_2026';
        const companyName = localStorage.getItem('companyName') || 'General';

        // Calculate score as exact number of correct code submissions out of 5
        const totalScore = finalProblems.filter(p => p.codeCorrect).length;
        const isIdentityFlagged = identityLogs.length > 0;
        const isSuspicionFlagged = finalSuspicion > 50;
        const isFlagged = isIdentityFlagged || isSuspicionFlagged;

        let flagReason = '';
        if (isSuspicionFlagged) flagReason += 'High suspicion score (tab switching/pasting). ';
        if (isIdentityFlagged) flagReason += `Identity verification failed (${identityLogs.length} mismatch incident(s)). `;

        try {
            await fetch('http://localhost:5000/api/exam/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentName,
                    studentEmail,
                    examId,
                    companyName,
                    totalScore,
                    problems: finalProblems.length > 0 ? finalProblems : [{
                        problemId: 'HACKATHON_2026',
                        score: totalScore,
                        timeTaken: totalTime
                    }],
                    isFlagged,
                    flagReason: isFlagged ? flagReason.trim() : null,
                    masterSnapshot: masterSelfie
                })
            });
        } catch (err) {
            console.warn('Could not submit exam result:', err);
        }
    };

    // Initialize Webcam and Background Proctoring
    useEffect(() => {
        let stream: MediaStream | null = null;
        let intervalId: NodeJS.Timeout;

        const setupWebcam = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // Capture Master Selfie after 2 seconds
                    setTimeout(() => {
                        captureAndVerify(true);
                    }, 2000);
                }
            } catch (err) {
                console.error("Webcam access denied:", err);
            }
        };

        const captureAndVerify = async (isMaster = false) => {
            if (!videoRef.current || !canvasRef.current) return;

            const canvas = canvasRef.current;
            const video = videoRef.current;

            // Ensure video metadata is loaded and video is playing
            if (video.readyState < 2 || video.videoWidth === 0) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);

            if (isMaster) {
                // Only capture a new master selfie if one doesn't already exist
                if (!masterSelfie && !localStorage.getItem('masterSelfie')) {
                    setMasterSelfie(imageBase64);
                    localStorage.setItem('masterSelfie', imageBase64);
                }
                return;
            }

            // Verify against Master Selfie
            const currentMaster = masterSelfie || localStorage.getItem('masterSelfie');
            if (!currentMaster) return;

            try {
                const res = await fetch('/api/verify-identity', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        candidateId: localStorage.getItem('userEmail'),
                        currentImageBase64: imageBase64,
                        masterImageBase64: currentMaster
                    })
                });

                const data = await res.json();

                // ROBUST FIX: Check for ANY violation indicators, even if AI incorrectly returns match: true
                const isViolation =
                    data.match === false ||
                    data.multiplePeople === true ||
                    ['multiple_people', 'cheat_material', 'face_covered', 'no_face', 'identity_mismatch'].includes(data.detectedIssue) ||
                    data.confidence > 70;

                // Log EVERY mismatch for recruiter review
                if (isViolation) {
                    console.log(`[Identity] Issue detected: ${data.detectedIssue}. MultiplePeople: ${data.multiplePeople}. Confidence: ${data.confidence}%`);

                    // Log mismatch to backend
                    await fetch('http://localhost:5000/api/exam/log-identity', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            studentEmail: localStorage.getItem('userEmail'),
                            examId: localStorage.getItem('examId') || 'HACKATHON_2026',
                            match: false, // Force false since it is a violation
                            confidence: data.confidence,
                            snapshot: imageBase64,
                            masterSnapshot: currentMaster,
                            detectedIssue: data.detectedIssue,
                            reason: data.reason || ""
                        })
                    });

                    setIdentityLogs(prev => [...prev, {
                        timestamp: new Date().toISOString(),
                        confidence: data.confidence,
                        snapshot: imageBase64,
                        issue: data.detectedIssue,
                        reason: data.reason || ""
                    }]);

                    // Increase suspicion score based on severity (Cheat material and identity mismatch are critical)
                    if (data.detectedIssue === 'cheat_material') {
                        incrementSuspicion(90);
                        setProctoringStatus('error');
                        setProctoringMessage('Cheat Material Detected');
                    } else if (data.multiplePeople === true || data.detectedIssue === 'multiple_people') {
                        // ROBUST FALLBACK: Check boolean flag in case Gemini failed to set the exact issue string
                        incrementSuspicion(60);
                        setProctoringStatus('error');
                        setProctoringMessage('Multiple Faces Detected');
                        setShowMultiplePeopleWarning(true);
                    } else if (data.confidence > 70 || data.detectedIssue === 'identity_mismatch') {
                        incrementSuspicion(60);
                        setProctoringStatus('warning');
                        setProctoringMessage('Identity Mismatch');
                        setShowIdentityWarning(true);
                    }
                } else {
                    console.log(`[Identity] Verified. Issue: ${data.detectedIssue}. Confidence: ${data.confidence}%`);
                    setProctoringStatus('ok');
                    setProctoringMessage('System Secure');
                }
            } catch (err) {
                console.error("Identity verification loop failed:", err);
            }
        };

        setupWebcam();

        // Run verification loop every 10 seconds for rapid detection
        intervalId = setInterval(() => {
            captureAndVerify(false);
        }, 10000);

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            clearInterval(intervalId);
        };
    }, [masterSelfie]);

    // Save master selfie to localStorage for persistency across level changes if needed
    useEffect(() => {
        if (masterSelfie) {
            localStorage.setItem('masterSelfie', masterSelfie);
        }
    }, [masterSelfie]);

    // Suspicion Score Logic
    const incrementSuspicion = (amount: number) => {
        setSuspicionScore(s => Math.min(s + amount, 100));
    };

    // Initial Fullscreen Sync
    useEffect(() => {
        setIsFullScreen(!!document.fullscreenElement);
    }, []);

    // Initial code update on level/language change
    useEffect(() => {
        setCode((LEVELS[currentLevel].boilerplates as any)[language] || '');
    }, [currentLevel, language]);

    // Strict Security: Keyboard & Right-click
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Block F12, F5, F11, ESC, Ctrl+R, Ctrl+U, Ctrl+Shift+I
            if (
                e.key === 'F12' ||
                e.key === 'F5' ||
                e.key === 'F11' ||
                e.key === 'Escape' ||
                (e.ctrlKey && (e.key === 'r' || e.key === 'u' || e.key === 'R' || e.key === 'U')) ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'))
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        window.addEventListener('keydown', handleKeyDown, true); // Use capture phase
        window.addEventListener('contextmenu', handleContextMenu);

        // Keyboard Lock API (Experimental but helpful in Chromium)
        if (typeof (navigator as any).keyboard?.lock === 'function') {
            (navigator as any).keyboard.lock(['Escape', 'F11']).catch((err: any) => {
                console.warn('Keyboard lock failed:', err);
            });
        }

        // Paste Detection
        const handlePaste = (e: ClipboardEvent) => {
            const pastedText = e.clipboardData?.getData('text') || '';
            if (pastedText.length > 50) {
                setPasteCount(p => p + 1);
                incrementSuspicion(30);
                // Alert removed for smoother experience
            }
        };
        window.addEventListener('paste', handlePaste);

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('paste', handlePaste);
            if (typeof (navigator as any).keyboard?.unlock === 'function') {
                (navigator as any).keyboard.unlock();
            }
        };
    }, []);

    // Strict Security: Tab Switching & Violations
    useEffect(() => {
        if (isSubmitted) return;

        const handleViolation = () => {
            incrementSuspicion(25);
            setViolations(v => {
                const newV = v + 1;
                if (newV >= 3) {
                    setIsSubmitted(true); // Terminate and submit
                    return newV;
                }
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 5000);
                return newV;
            });
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation();
            }
        };

        const handleBlur = () => {
            handleViolation();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
        };
    }, [isSubmitted]);

    // Exit fullscreen ONLY on submission
    useEffect(() => {
        if (isSubmitted && document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
        }
    }, [isSubmitted]);

    // Fullscreen enforcement
    useEffect(() => {
        // Initial check
        setIsFullScreen(!!document.fullscreenElement);

        const handleFullscreenChange = () => {
            const fs = !!document.fullscreenElement;
            setIsFullScreen(fs);

            // We do not force fullscreen here because it causes 'Permissions check failed'
            // The existing !isFullScreen overlay UI will handle the user click to resume.
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isSubmitted]);

    const enterFullScreen = () => {
        if (containerRef.current?.requestFullscreen) {
            containerRef.current.requestFullscreen();
        }
    };

    // Prevent exit/back
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isSubmitted) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Push state for back button prevention
        window.history.pushState(null, '', window.location.href);
        const handlePopState = () => {
            if (!isSubmitted) {
                window.history.pushState(null, '', window.location.href);
                // Alert removed for smoother experience
            }
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isSubmitted]);

    // Timer
    useEffect(() => {
        if (isSubmitted) return;
        const timer = setInterval(() => {
            setTime(t => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [isSubmitted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleRun = () => {
        // We seamlessly move the user to the next phase (quiz) whether the code is right or wrong
        setStatus('success');
        setTimeout(() => {
            setShowQuiz(true);
        }, 800);
    };

    const handleQuizAnswer = (index: number) => {
        const currentProblem = LEVELS[currentLevel];
        const isQuizCorrect = index === currentProblem.verification.correctAnswer;
        if (!isQuizCorrect) {
            incrementSuspicion(20);
        }

        // Evaluate the code here
        const isCodeCorrect = currentProblem.test(code, language);

        // Track this problem result (50 points for code, 50 points for quiz)
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const levelScore = (isCodeCorrect ? 50 : 0) + (isQuizCorrect ? 50 : 0);
        setProblemResults(prev => [...prev, {
            problemId: `level_${currentLevel + 1}`,
            score: levelScore,
            timeTaken,
            answeredCorrectly: isCodeCorrect && isQuizCorrect,
            codeCorrect: isCodeCorrect
        }]);

        setShowQuiz(false);
        if (currentLevel < LEVELS.length - 1) {
            const nextLevel = currentLevel + 1;
            setCurrentLevel(nextLevel);
            setStatus('idle');
        } else {
            const totalTime = Math.floor((Date.now() - startTime) / 1000);
            const isCodeCorrect = currentProblem.test(code, language);
            const isQuizCorrect = index === currentProblem.verification.correctAnswer;
            const updatedProblems = [...problemResults, { problemId: `level_${currentLevel + 1}`, score: (isCodeCorrect ? 50 : 0) + (isQuizCorrect ? 50 : 0), timeTaken, answeredCorrectly: isCodeCorrect && isQuizCorrect, codeCorrect: isCodeCorrect }];
            submitResultsToBackend(updatedProblems, suspicionScore, currentLevel + 1, totalTime);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        const totalTime = Math.floor((Date.now() - startTime) / 1000);

        // Unified Integrity Check: Flagged if suspicion > 50 OR any proctoring issue was logged
        const hasProctoringViolation = identityLogs.some(log =>
            log.confidence > 70 ||
            ['multiple_people', 'cheat_material', 'face_covered'].includes(log.issue)
        );
        const isSuspicous = suspicionScore > 50 || hasProctoringViolation;

        // Also submit if exam was terminated early (violations >= 3)
        if (!hasSubmittedRef.current) {
            submitResultsToBackend(problemResults, suspicionScore, currentLevel, totalTime);
        }

        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-12 rounded-3xl border border-white/10 text-center max-w-2xl w-full"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                        {identityLogs.some(log => log.confidence > 70) ? (
                            <AlertTriangle size={40} className="text-red-400 animate-pulse" />
                        ) : (
                            <CheckCircle2 size={40} className={`text-emerald-400 ${isSuspicous ? 'text-yellow-500' : ''}`} />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isSuspicous ? "Security Flagged" : (violations >= 3 ? "Test Terminated" : "Assessment Complete")}
                    </h1>
                    <p className="text-gray-400 mb-8">
                        {isSuspicous
                            ? `Your session has been flagged for manual review: ${identityLogs.some(l => l.issue === 'multiple_people') ? "multiple users are found" :
                                identityLogs.some(l => l.issue === 'cheat_material') ? "Possible cheating material detected." :
                                    identityLogs.some(l => l.issue === 'face_covered') ? "Face obstructed multiple times." :
                                        suspicionScore > 50 ? "Unusual behavioral patterns recorded." :
                                            "change in person"
                            }`
                            : (violations >= 3
                                ? "Automatically submitted due to security protocols."
                                : "Your results have been processed and analyzed for integrity.")
                        }
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Score</p>
                            <p className="text-xl font-bold text-emerald-400">
                                {problemResults.filter(p => p.codeCorrect).length}/5
                            </p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Time taken</p>
                            <p className="text-xl font-bold text-white">{formatTime(totalTime)}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Pastes</p>
                            <p className="text-xl font-bold text-white">{pasteCount}</p>
                        </div>
                        <div className={`p-4 rounded-2xl border ${isSuspicous ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/5'}`}>
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Integrity</p>
                            <p className={`text-xl font-bold ${isSuspicous ? 'text-red-500' : 'text-emerald-500'}`}>
                                {isSuspicous ? 'Flagged' : 'Secure'}
                            </p>
                        </div>
                    </div>

                    {isSuspicous && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-3 flex items-start gap-3 text-left">
                            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                            <div>
                                <p className="text-red-200 text-sm font-bold">Possible AI Assistance Detected</p>
                                <p className="text-red-400/70 text-xs">Unusual typing patterns and code insertion events were recorded.</p>
                            </div>
                        </div>
                    )}

                    {identityLogs.some(log => log.confidence > 70) && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8 flex items-start gap-3 text-left">
                            <User className="text-red-400 shrink-0 mt-0.5" size={18} />
                            <div>
                                <p className="text-red-200 text-sm font-bold">Identity Verification Failed</p>
                                <p className="text-red-400/70 text-xs">AI proctoring detected a potential person-switch during the test. This session is flagged for manual audit.</p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => router.push('/')}
                        className="premium-gradient text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all w-full md:w-auto"
                    >
                        Return to Login
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentProblem = LEVELS[currentLevel];

    return (
        <div ref={containerRef} className="h-screen bg-[#080808] text-white flex flex-col font-sans overflow-hidden active:selection:bg-blue-500/30">
            {/* Anti-Camera Visual Noise Overlay (CameraShield) */}
            <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
                <div className="absolute inset-0 animate-camera-flicker"
                    style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 3px)`,
                        backgroundSize: '100% 4px'
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes camera-flicker {
                    0% { opacity: 0.01; }
                    50% { opacity: 0.05; }
                    100% { opacity: 0.01; }
                }
                .animate-camera-flicker {
                    animation: camera-flicker 0.016s infinite linear;
                }
            `}} />
            {/* Fullscreen Lockdown Overlay */}
            <AnimatePresence>
                {!isFullScreen && !isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 text-center"
                    >
                        <div className="max-w-md">
                            <Maximize2 size={64} className="text-emerald-500 mx-auto mb-6 animate-pulse" />
                            <h1 className="text-2xl font-bold text-white mb-4">Assessment Paused</h1>
                            <p className="text-gray-400 mb-8">Full-screen mode is required to maintain the integrity of this evaluation. Please resume the secure session to continue.</p>
                            <button
                                onClick={enterFullScreen}
                                className="bg-emerald-500 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/20"
                            >
                                <Lock size={20} />
                                Resume Assessment
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Header */}
            <header className="h-16 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-8 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Code2 size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white tracking-tight uppercase">Technical Assessment</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500">LEVEL {currentLevel + 1} OF {LEVELS.length}</span>
                            <div className="flex gap-1">
                                {LEVELS.map((_, i) => (
                                    <div key={i} className={`w-3 h-1 rounded-full ${i <= currentLevel ? 'bg-emerald-500' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex bg-white/5 rounded-xl border border-white/5 p-1">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setLanguage(lang.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${language === lang.id
                                    ? 'bg-emerald-500 text-white shadow-lg'
                                    : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {lang.icon}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        <Clock size={16} className="text-emerald-400" />
                        <span className="font-mono font-bold text-sm tracking-widest">{formatTime(time)}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden relative">
                <AnimatePresence>
                    {showWarning && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
                        >
                            <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl max-w-md text-center">
                                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-2">Security Violation!</h2>
                                <p className="text-gray-300 mb-4">
                                    Switching tabs or windows is strictly prohibited. This is violation **{violations}/3**.
                                </p>
                                <p className="text-red-400 text-xs font-bold uppercase tracking-widest">
                                    The next violation may result in automatic termination.
                                </p>
                                <button
                                    onClick={() => setShowWarning(false)}
                                    className="mt-6 bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-all"
                                >
                                    I Understand
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showMultiplePeopleWarning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/30 p-10 rounded-[40px] max-w-lg text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
                            >
                                <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/40">
                                    <Users size={40} className="text-red-500" />
                                </div>
                                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Security Alert</h1>
                                <h2 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-widest">Multiple People Detected</h2>
                                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                                    Our AI proctoring system has detected **more than one person** in your camera frame. This is a critical violation of exam integrity.
                                </p>
                                <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 mb-8">
                                    <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        This incident has been logged and sent to the recruiter for review.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowMultiplePeopleWarning(false)}
                                    className="bg-red-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                                >
                                    I Understand & Resume
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showIdentityWarning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-orange-500/10 border border-orange-500/30 p-10 rounded-[40px] max-w-lg text-center shadow-[0_0_50px_rgba(249,115,22,0.2)]"
                            >
                                <div className="w-20 h-20 bg-orange-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-orange-500/40">
                                    <User size={40} className="text-orange-500" />
                                </div>
                                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Security Alert</h1>
                                <h2 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-widest">Identity Mismatch</h2>
                                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                                    Our AI proctoring system has detected that the person currently in front of the camera **does not match** the registered candidate profile.
                                </p>
                                <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 mb-8">
                                    <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        This incident has been logged and sent to the recruiter for review.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowIdentityWarning(false)}
                                    className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                                >
                                    I Understand & Resume
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showQuiz && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="glass p-10 rounded-[40px] border border-white/10 max-w-xl w-full"
                            >
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                                    <AlertCircle size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Verification Check</h3>
                                <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
                                    {LEVELS[currentLevel].verification.question}
                                </h2>

                                <div className="space-y-3">
                                    {LEVELS[currentLevel].verification.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuizAnswer(i)}
                                            className="w-full text-left p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all text-gray-300 hover:text-white font-medium group flex items-center justify-between"
                                        >
                                            <span>{opt}</span>
                                            <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-blue-400" />
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-8 text-[10px] text-gray-500 font-medium uppercase tracking-widest text-center">
                                    This question verifies comprehension of the logic you just implemented.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Left Panel: Problem Description */}
                <div className="w-[450px] border-r border-white/5 p-8 flex flex-col gap-6 overflow-y-auto bg-[#0A0A0A]">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{currentProblem.title}</h1>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {currentProblem.description}
                        </p>
                    </div>

                    <div className="mt-auto space-y-4">
                        {/* Proctoring Preview Window (Moved to Sidebar) */}
                        <div className="relative group transition-all">
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-lg transition-all ${proctoringStatus === 'error' ? 'bg-red-500 border-red-400 shadow-red-500/40' :
                                proctoringStatus === 'warning' ? 'bg-amber-500 border-amber-400 shadow-amber-500/40' :
                                    'bg-emerald-500 border-emerald-400 shadow-emerald-500/40'
                                }`}>
                                <div className={`w-2 h-2 rounded-full bg-white ${proctoringStatus !== 'ok' ? 'animate-bounce' : 'animate-pulse'}`} />
                                <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                                    {proctoringStatus === 'ok' ? 'System Secure' : proctoringMessage}
                                </span>
                            </div>

                            <div className={`w-full aspect-video rounded-3xl overflow-hidden border-2 transition-all duration-500 glass shadow-2xl ${proctoringStatus === 'error' ? 'border-red-500 animate-pulse' :
                                proctoringStatus === 'warning' ? 'border-amber-500' :
                                    'border-white/10 group-hover:border-emerald-500/50'
                                }`}>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className={`w-full h-full object-cover transition-all ${proctoringStatus === 'error' ? 'grayscale-0 brightness-110' :
                                        proctoringStatus === 'warning' ? 'grayscale-[0.2]' :
                                            'grayscale-[0.3] brightness-90 group-hover:grayscale-0 group-hover:brightness-100'
                                        }`}
                                />
                                {/* Overlay scanline effect */}
                                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

                                {proctoringStatus !== 'ok' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 pointer-events-none">
                                        <div className="text-[40px] font-black text-red-500/20 uppercase -rotate-12 border-4 border-red-500/20 px-4 py-2 rounded-xl">
                                            {proctoringStatus === 'error' ? 'FLAGGED' : 'CAUTION'}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={`mt-3 flex items-center justify-center gap-2 font-bold transition-colors ${proctoringStatus === 'error' ? 'text-red-400' :
                                proctoringStatus === 'warning' ? 'text-amber-400' :
                                    'text-gray-500 group-hover:text-emerald-400'
                                }`}>
                                {proctoringStatus === 'ok' ? <ShieldAlert size={14} /> : <AlertTriangle size={14} />}
                                <span className="text-[10px] uppercase tracking-widest">
                                    {proctoringStatus === 'ok' ? 'AI Proctoring Active' : 'Integrity Alert'}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hint</h3>
                            <p className="text-gray-400 text-xs italic">{currentProblem.hint}</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Editor & Output */}
                <div className="flex-1 flex flex-col relative overflow-hidden">
                    <div className="flex-1 bg-[#1e1e1e]">
                        <Editor
                            height="100%"
                            language={language === 'cpp' || language === 'c' ? 'cpp' : language}
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => {
                                const newCode = v || '';
                                const now = Date.now();
                                const diff = now - lastEditTime;
                                const lenDiff = Math.abs(newCode.length - code.length);

                                // Detection: If user inserts > 30 chars in < 50ms, it's a surge
                                if (lenDiff > 30 && diff < 50) {
                                    incrementSuspicion(15);
                                    console.warn("Sudden code surge detected.");
                                }

                                setLastEditTime(now);
                                setCode(newCode);
                            }}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Footer / Controls */}
                    <div className="h-20 border-t border-white/5 bg-white/[0.02] flex items-center justify-between px-8 shrink-0">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            <Terminal size={16} className="text-gray-500" />
                            <span className="text-gray-500">Node.js Environment</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <AnimatePresence mode="wait">
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex items-center gap-2 text-emerald-400 font-bold"
                                    >
                                        <CheckCircle2 size={18} />
                                        <span>Accepted</span>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex items-center gap-2 text-red-400 font-bold"
                                    >
                                        <AlertCircle size={18} />
                                        <span>Wrong Solution</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={handleRun}
                                className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10 active:scale-95 disabled:opacity-50"
                                disabled={status === 'success'}
                            >
                                <span>{currentLevel === LEVELS.length - 1 ? 'Submit Test' : 'Next Level'}</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>


            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
