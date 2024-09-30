import { Progress } from '@/components/ui/ShadCN/progress';
import React from 'react';

type HealthinessProgressProps = {
    higherIsBetter: boolean;
    value: number;
};

export const HealthinessProgress: React.FC<HealthinessProgressProps> = ({
    higherIsBetter,
    value,
}) => {
    let color = '';

    if (value > 0.8) {
        color = higherIsBetter ? 'bg-green-500' : 'bg-red-500';
    } else if (value > 0.4) {
        color = 'bg-orange-500';
    } else {
        color = higherIsBetter ? 'bg-red-500' : 'bg-green-500';
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mb-2 text-gray-700 font-semibold">
                {Math.round(value * 100)}%
            </div>
            <Progress value={value * 100} indicatorColor={color} />
        </div>
    );
};
