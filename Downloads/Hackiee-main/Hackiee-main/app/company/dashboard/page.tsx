'use client';

import React from 'react';
import { Building, Users, Activity, Settings, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';

export default function CompanyDashboard() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto p-6 md:p-12 pt-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Company <span className="text-emerald-500">Workspace</span></h1>
                    <p className="text-gray-400 mt-2 text-lg">Manage your organization's talent needs and active assessments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { label: 'Active Jobs', value: '12', icon: Building, color: 'text-emerald-400' },
                    { label: 'Candidates in Pipeline', value: '48', icon: Users, color: 'text-blue-400' },
                    { label: 'Completed Assessments', value: '124', icon: Activity, color: 'text-purple-400' },
                ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/10 group hover:border-white/20 transition-all relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* Company Information Card */}
                <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl lg:col-span-1 relative">
                    <div className="absolute top-0 right-0 p-6">
                        <button className="text-gray-500 hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 rounded-2xl premium-gradient flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
                            <Building size={40} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            Acme Technologies <CheckCircle2 size={18} className="text-emerald-500" />
                        </h2>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Enterprise Partner</span>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                <Mail size={18} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider font-bold">Primary Contact</p>
                                <p className="text-white text-sm">admin@acmecorp.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                <MapPin size={18} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider font-bold">Headquarters</p>
                                <p className="text-white text-sm">San Francisco, CA</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                <Globe size={18} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider font-bold">Industry</p>
                                <p className="text-white text-sm">Artificial Intelligence / SaaS</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl lg:col-span-2 flex flex-col justify-center text-left">
                    <h2 className="text-2xl font-bold text-white mb-4">Talent Acquisition Hub</h2>
                    <p className="text-gray-400 mb-8 max-w-xl">
                        Welcome to your company workspace. From here, you can define specific technical and behavioral challenges, invite developers, and review automated AI verified assessments to ensure talent integrity.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all p-5 rounded-2xl flex flex-col gap-2 group text-left">
                            <Users size={20} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="text-white font-bold">Invite Candidates</h3>
                            <p className="text-xs text-gray-500">Send custom assessment links</p>
                        </button>

                        <button className="bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all p-5 rounded-2xl flex flex-col gap-2 group text-left">
                            <Activity size={20} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="text-white font-bold">Review Reports</h3>
                            <p className="text-xs text-gray-500">View detailed bio-metric logs</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
