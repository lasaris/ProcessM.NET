import { MiningChoiceCard } from '@/components/ui/MiningChoiceCard';
import AlphaMiningLogo from '@/icons/AlphaMiner.svg';
import Discover from '@/icons/Discover.svg';
import HeuristicMininingLogo from '@/icons/HeuristicMiner.svg';
import TreeGraph from '@/icons/TreeGraph.svg';
import { TargetURL } from '@/router';
import React from 'react';

export const LogOperationSelection: React.FC = () => {
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
            targetUrl={TargetURL.DISCOVER_CONFIGURE_CASE_ACTIVITY}
        />,
        <MiningChoiceCard
            key="Models"
            name="View Models"
            svgLogo={<img src={TreeGraph} alt="Discover" />}
            targetUrl={TargetURL.MODELS_TABLE}
        />,
    ];

    return (
        <div className="h-full w-full md:w-3/4 lg:w-2/3 xl:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-center place-items-center gap-4 p-10">
            {miningChoicesCards}
        </div>
    );
};
