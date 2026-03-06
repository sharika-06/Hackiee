import React from 'react';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-white/10 glass px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center font-bold">V</div>
                    <span className="font-bold text-xl tracking-tight">VeriSkill AI</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Student Portal</span>
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs">S</div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}
