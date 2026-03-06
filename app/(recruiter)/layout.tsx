import React from 'react';

export default function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-white/10 glass px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center font-bold text-white">V</div>
                    <span className="font-bold text-xl tracking-tight">VeriSkill <span className="text-blue-400">Pro</span></span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-4 text-sm font-medium">
                        <a href="#" className="text-white">Candidates</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Jobs</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a>
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs font-semibold text-white">Talent Acquisition</p>
                            <p className="text-[10px] text-gray-400">Enterprise Plan</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-xs font-bold text-indigo-400">TA</div>
                    </div>
                </div>
            </nav>
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
