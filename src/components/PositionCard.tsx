import { Plus, Trash2 } from 'lucide-react';
import type { Position, PositionType } from '../logic/payoff';

interface PositionCardProps {
    title: string;
    type: PositionType;
    positions: Position[];
    onAdd: (type: PositionType) => void;
    onUpdate: (id: string, field: keyof Position, value: any) => void;
    onDelete: (id: string) => void;
}

const PositionCard: React.FC<PositionCardProps> = ({
    title,
    type,
    positions,
    onAdd,
    onUpdate,
    onDelete
}) => {
    const filteredPositions = positions.filter(p => p.type === type);
    const isFuture = type.includes('Future');

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem' }}>{title}</h3>
                <button
                    onClick={() => onAdd(type)}
                    className="btn-primary"
                    style={{ padding: '0.25rem', borderRadius: '4px', display: 'flex' }}
                >
                    <Plus size={16} />
                </button>
            </div>

            <table className="position-table">
                <thead>
                    <tr>
                        <th>{isFuture ? 'Entry' : 'Strike'}</th>
                        <th>{isFuture ? 'Size' : 'Premium'}</th>
                        {!isFuture && <th>Size</th>}
                        <th style={{ width: '32px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPositions.map((pos) => (
                        <tr key={pos.id}>
                            <td>
                                <input
                                    type="number"
                                    value={isFuture ? pos.entryPrice : pos.strikePrice}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/^0+(?!$)/, '');
                                        onUpdate(pos.id, isFuture ? 'entryPrice' : 'strikePrice', parseFloat(val) || 0);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={isFuture ? pos.amount : pos.premium}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/^0+(?!$)/, '');
                                        onUpdate(pos.id, isFuture ? 'amount' : 'premium', parseFloat(val) || 0);
                                    }}
                                />
                            </td>
                            {!isFuture && (
                                <td>
                                    <input
                                        type="number"
                                        value={pos.amount}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/^0+(?!$)/, '');
                                            onUpdate(pos.id, 'amount', parseFloat(val) || 0);
                                        }}
                                    />
                                </td>
                            )}
                            <td>
                                <button
                                    onClick={() => onDelete(pos.id)}
                                    style={{ background: 'transparent', color: 'var(--loss-color)', padding: '0' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredPositions.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem' }}>
                    No positions
                </p>
            )}
        </div>
    );
};

export default PositionCard;
