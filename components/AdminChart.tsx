"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
interface ChartItem {
    _id: string;
    count: number;
}
interface AdminChartProps {
    data: ChartItem[];
}
export default function AdminChart({data}: AdminChartProps) {

    return(
        <div className="bg-white p-4 rounded shadow">

            <h2 className="font-bold mb-4">
                New Users {'Last 30 Days'}
            </h2>

            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data}>
                    <XAxis dataKey='_id' />
                    <YAxis />

                    <Tooltip />

                    <Line 
                    type='monotone'
                    dataKey='count'
                    stroke="#2563eb"
                    strokeWidth={2}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
