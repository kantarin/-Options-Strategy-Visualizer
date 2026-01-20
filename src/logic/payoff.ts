export type PositionType = 'Long Call' | 'Short Call' | 'Long Put' | 'Short Put' | 'Long Future' | 'Short Future';

export interface Position {
    id: string;
    type: PositionType;
    strikePrice: number;
    premium: number;
    entryPrice: number;
    amount: number;
}

export const calculateProfit = (spotPrice: number, position: Position): number => {
    const { type, strikePrice, premium, entryPrice, amount } = position;

    switch (type) {
        case 'Long Call':
            return (Math.max(0, spotPrice - strikePrice) - premium) * amount;
        case 'Short Call':
            return (premium - Math.max(0, spotPrice - strikePrice)) * amount;
        case 'Long Put':
            return (Math.max(0, strikePrice - spotPrice) - premium) * amount;
        case 'Short Put':
            return (premium - Math.max(0, strikePrice - spotPrice)) * amount;
        case 'Long Future':
            return (spotPrice - entryPrice) * amount;
        case 'Short Future':
            return (entryPrice - spotPrice) * amount;
        default:
            return 0;
    }
};

export const calculateTotalProfit = (spotPrice: number, positions: Position[]): number => {
    return positions.reduce((total, pos) => total + calculateProfit(spotPrice, pos), 0);
};

export const generateChartData = (minSpot: number, maxSpot: number, step: number, positions: Position[]) => {
    const data = [];
    for (let spot = minSpot; spot <= maxSpot; spot += step) {
        data.push({
            spot,
            profit: calculateTotalProfit(spot, positions),
        });
    }
    return data;
};
