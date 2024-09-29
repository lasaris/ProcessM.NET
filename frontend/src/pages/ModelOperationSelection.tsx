import { MiningChoiceCard } from '@/components/ui/MiningChoiceCard';
import ChecklistLogo from '@/icons/Checklist.svg';
import { TargetURL } from '@/router';
import React from 'react';

export const ModelOperationSelection: React.FC = () => {
    const miningChoicesCards = [
        <MiningChoiceCard
            key="Conformance"
            name="Conformance"
            svgLogo={<img src={ChecklistLogo} alt="Conformance Check" />}
            targetUrl={TargetURL.CONFORMANCE}
        />,
    ];

    return (
        <div className="h-full w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex items-center justify-center gap-4 p-10">
            {miningChoicesCards}
        </div>
    );
};
