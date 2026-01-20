import { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import type { Position } from '../logic/payoff';
import { generateChartData } from '../logic/payoff';

interface PayoffChartProps {
    positions: Position[];
    minSpot: number;
    maxSpot: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const profit = payload[0].value;
        return (
            <div className="card" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Spot: <span style={{ color: 'var(--text-primary)' }}>{label}</span></p>
                <p style={{
                    color: profit >= 0 ? 'var(--profit-color)' : 'var(--loss-color)',
                    fontWeight: 'bold'
                }}>
                    P/L: {profit.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

const PayoffChart = ({ positions, minSpot, maxSpot }: PayoffChartProps) => {
    const data = useMemo(() => {
        return generateChartData(minSpot, maxSpot, (maxSpot - minSpot) / 100, positions);
    }, [positions, minSpot, maxSpot]);

    return (
        <div className="card" style={{ flex: 1, minHeight: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Strategy Payoff</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="spot"
                        stroke="var(--text-secondary)"
                        fontSize={12}
                        tickFormatter={(val) => val.toFixed(0)}
                    />
                    <YAxis
                        stroke="var(--text-secondary)"
                        fontSize={12}
                        tickFormatter={(val) => val.toFixed(0)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="var(--accent-primary)"
                        strokeWidth={3}
                        dot={false}
                        animationDuration={300}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PayoffChart;
