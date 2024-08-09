import React from 'react';
import { PMSelect, SelectOption } from './PMSelect';

export const ImperativeMinerSelect: React.FC = () => {
    const options: SelectOption[] = [
        {
            title: 'Heuristic Miner',
            value: 'heuristicMiner',
        },
        {
            title: 'Alpha Miner',
            value: 'alphaMiner',
        },
    ];

    return <PMSelect className="w-5/6" options={options} placeholder="Miner" />;
};
