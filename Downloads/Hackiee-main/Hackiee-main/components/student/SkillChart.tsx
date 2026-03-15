'use client';

import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

interface SkillData {
    subject: string;
    A: number;
    fullMark: number;
}

interface SkillChartProps {
    data: {
        syntax: number;
        logic: number;
        performance: number;
        aiIndependence: number;
    };
}

export default function SkillChart({ data }: SkillChartProps) {
    const chartData: SkillData[] = [
        { subject: 'Syntax', A: data.syntax, fullMark: 100 },
        { subject: 'Logic', A: data.logic, fullMark: 100 },
        { subject: 'Performance', A: data.performance, fullMark: 100 },
        { subject: 'AI Independence', A: data.aiIndependence, fullMark: 100 },
    ];

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
