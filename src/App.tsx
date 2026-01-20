import { useState, useEffect } from 'react';
import type { Position, PositionType } from './logic/payoff';
import PayoffChart from './components/PayoffChart';
import PositionCard from './components/PositionCard';
import { Settings } from 'lucide-react';

function App() {
  const [positions, setPositions] = useState<Position[]>(() => {
    const saved = localStorage.getItem('antigravity_positions');
    return saved ? JSON.parse(saved) : [];
  });

  const [chartRange, setChartRange] = useState(() => {
    const saved = localStorage.getItem('antigravity_chart_range');
    return saved ? JSON.parse(saved) : { min: 800, max: 1200 };
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('antigravity_positions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('antigravity_chart_range', JSON.stringify(chartRange));
  }, [chartRange]);

  const addPosition = (type: PositionType) => {
    const newPos: Position = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      strikePrice: 1000,
      premium: 10,
      entryPrice: 1000,
      amount: 1,
    };
    setPositions([...positions, newPos]);
  };

  const updatePosition = (id: string, field: keyof Position, value: any) => {
    setPositions(positions.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deletePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  return (
    <div className="app-container">
      <div className="chart-section">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Antigravity Options</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>SET50 Index Strategy Visualizer</p>
          </div>
          <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Settings size={16} color="var(--text-secondary)" />
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Range:</span>
              <input
                type="number"
                style={{ width: '60px', padding: '0.25rem' }}
                value={chartRange.min}
                onChange={(e) => {
                  const val = e.target.value.replace(/^0+(?!$)/, '');
                  setChartRange({ ...chartRange, min: parseInt(val) || 0 });
                }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>-</span>
              <input
                type="number"
                style={{ width: '60px', padding: '0.25rem' }}
                value={chartRange.max}
                onChange={(e) => {
                  const val = e.target.value.replace(/^0+(?!$)/, '');
                  setChartRange({ ...chartRange, max: parseInt(val) || 0 });
                }}
              />
            </div>
          </div>
        </header>

        <PayoffChart
          positions={positions}
          minSpot={chartRange.min}
          maxSpot={chartRange.max}
        />

        <div className="card" style={{ marginTop: 'auto' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            💡 Tip: Add positions using the "+" buttons on the right. The chart will update automatically.
          </p>
        </div>
      </div>

      <div className="sidebar">
        <PositionCard
          title="Long Call"
          type="Long Call"
          positions={positions}
          onAdd={addPosition}
          onUpdate={updatePosition}
          onDelete={deletePosition}
        />
        <PositionCard
          title="Short Call"
          type="Short Call"
          positions={positions}
          onAdd={addPosition}
          onUpdate={updatePosition}
          onDelete={deletePosition}
        />
        <PositionCard
          title="Long Put"
          type="Long Put"
          positions={positions}
          onAdd={addPosition}
          onUpdate={updatePosition}
          onDelete={deletePosition}
        />
        <PositionCard
          title="Short Put"
          type="Short Put"
          positions={positions}
          onAdd={addPosition}
          onUpdate={updatePosition}
          onDelete={deletePosition}
        />
        <PositionCard
          title="Long Future"
          type="Long Future"
          positions={positions}
          onAdd={addPosition}
          onUpdate={updatePosition}
          onDelete={deletePosition}
        />
        <PositionCard
          title="Short Future"
          type="Short Future"
          positions={positions}
          onAdd={addPosition}
          onUpdate={updatePosition}
          onDelete={deletePosition}
        />
      </div>
    </div>
  );
}

export default App;
