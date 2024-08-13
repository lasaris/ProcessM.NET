import { MiningChoiceCard } from '@/components/ui/MiningChoiceCard';
import AlphaMiningLogo from '@/icons/AlphaMiner.svg';
import ChecklistLogo from '@/icons/Checklist.svg';
import Discover from '@/icons/Discover.svg';
import EditLogo from '@/icons/Edit.svg';
import HeuristicMininingLogo from '@/icons/HeuristicMiner.svg';
import { TargetURL } from '@/router';
import React from 'react';

export const MiningChoicePage: React.FC = () => {
    const miningChoicesCards = [
        <MiningChoiceCard
            key="AlphaMining"
            name="Alpha Mining"
            svgLogo={<img src={AlphaMiningLogo} alt="Alpha Miner" />}
            targetUrl={TargetURL.ALPHA_MINE}
        />,
        <MiningChoiceCard
            key="HeuristicMining"
            name="Heuristic Mining"
            svgLogo={<img src={HeuristicMininingLogo} alt="Alpha Miner" />}
            targetUrl={TargetURL.HEURISTIC_MINE}
        />,
        <MiningChoiceCard
            key="Discover"
            name="Discover"
            svgLogo={<img src={Discover} alt="Discover" />}
            targetUrl={TargetURL.DISCOVER}
        />,
        <MiningChoiceCard
            key="Edit"
            name="Edit"
            svgLogo={<img src={EditLogo} alt="Edit Log" />}
            targetUrl={TargetURL.EDIT}
        />,
        <MiningChoiceCard
            key="Conformance"
            name="Conformance"
            svgLogo={<img src={ChecklistLogo} alt="Conformance Check" />}
            targetUrl={TargetURL.CONFORMANCE}
        />,
    ];

    return (
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 content-center place-items-center gap-4 p-10">
            {miningChoicesCards}
        </div>
    );
};
