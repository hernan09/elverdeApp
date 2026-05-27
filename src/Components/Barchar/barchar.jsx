import React from 'react';
import { BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar } from 'recharts';
import './barchar.css';
import ChartTooltip from '../ChartTooltip';

const Barchar = ({data}) => {
    return (
        <div className='content-barchart'>
            <h3 className='chart-title'>Evolución Dólar Oficial — 30 días</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 5, bottom: 5, right: 10, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="Fecha"
                        reversed={true}
                        height={56}
                        interval="preserveStart"
                        allowDataOverflow={true}
                        tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "DM Sans" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickLine={false}
                    />
                    <YAxis
                        dataKey="Valor"
                        tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "DM Sans" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={<ChartTooltip color="#95d5b2" labelName="Dólar Oficial" />}
                        cursor={{ fill: "#d8f3dc" }}
                    />
                    <Bar
                        dataKey="Valor"
                        fill="#95d5b2"
                        radius={[3, 3, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Barchar;
