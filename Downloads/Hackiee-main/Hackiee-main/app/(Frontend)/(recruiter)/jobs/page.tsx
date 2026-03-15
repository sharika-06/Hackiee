'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, ArrowRight, Code, PenTool, Database, Layout } from 'lucide-react';

const JOBS = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        department: 'Engineering',
        type: 'Full-time',
        location: 'Remote',
        vacancies: 3,
        icon: Layout,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10'
    },
    {
        id: 2,
        title: 'UI/UX Designer',
        department: 'Design',
        type: 'Full-time',
        location: 'New York, NY',
        vacancies: 2,
        icon: PenTool,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10'
    },
    {
        id: 3,
        title: 'Backend Developer',
        department: 'Engineering',
        type: 'Contract',
        location: 'Remote',
        vacancies: 5,
        icon: Database,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10'
    },
    {
        id: 4,
        title: 'Full Stack Developer',
        department: 'Engineering',
        type: 'Full-time',
        location: 'San Francisco, CA',
        vacancies: 1,
        icon: Code,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10'
    }
];

export default function JobsPage() {
    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto p-2 sm:p-6 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Active <span className="text-blue-500">Requisitions</span></h1>
                    <p className="text-gray-400 mt-2 text-lg">Manage open roles and track candidate pipelines.</p>
                </div>
                <button className="premium-gradient text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                    <Briefcase size={18} />
                    Create New Job
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {JOBS.map((job, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={job.id}
                        className="glass p-8 rounded-[32px] border border-white/10 hover:border-white/20 transition-all group overflow-hidden relative"
                    >
                        {/* Background subtle glow */}
                        <div className={`absolute -right-20 -top-20 w-40 h-40 ${job.bgColor} blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className={`p-4 rounded-2xl ${job.bgColor} border border-white/5`}>
                                    <job.icon size={32} className={job.color} />
                                </div>
                                <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
                                    {job.department}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>

                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 font-medium">
                                <span>{job.type}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                <span>{job.location}</span>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Users size={18} className="text-gray-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-lg leading-tight">{job.vacancies}</span>
                                        <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Vacancies</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
