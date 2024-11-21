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
            description="The Alpha algorithm is a simple, early process discovery method that reconstructs basic models but struggles with complexity and noise, making the Heuristic Miner a better choice."
            svgLogo={<img src={AlphaMiningLogo} alt="Alpha Miner" />}
            targetUrl={TargetURL.ALPHA_MINE}
        />,
        <MiningChoiceCard
            key="HeuristicMining"
            name="Heuristic Mining"
            description="The Heuristic Miner is an improved process discovery algorithm that handles noise and complexity better than the Alpha algorithm, creating more accurate models from real-life logs."
            svgLogo={<img src={HeuristicMininingLogo} alt="Alpha Miner" />}
            targetUrl={TargetURL.HEURISTIC_MINE}
        />,
        <MiningChoiceCard
            key="Discover"
            name="DECLARE Discovery"
            description="The discovery process for DECLARE constraints identifies and extracts rule-based patterns from event logs, generating a compact, flexible model of allowable behaviors within the process."
            svgLogo={<img src={Discover} alt="Discover" />}
            targetUrl={TargetURL.DISCOVER_CONFIGURE_CASE_ACTIVITY}
        />,
        <MiningChoiceCard
            key="Models"
            name="View Models"
            svgLogo={<img src={TreeGraph} alt="Discover" />}
            description="View the mined models of the selected log."
            targetUrl={TargetURL.MODELS_TABLE}
        />,
    ];

    return (
        <div className="h-full w-full md:w-3/4 lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 content-center place-items-center gap-4 p-10">
            {miningChoicesCards}
        </div>
    );
};
