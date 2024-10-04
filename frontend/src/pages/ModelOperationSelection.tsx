import { MiningChoiceCard } from '@/components/ui/MiningChoiceCard';
import ChecklistLogo from '@/icons/Checklist.svg';
import { ModelType } from '@/models/ImperativeModel';
import { TargetURL } from '@/router';
import React from 'react';

type ModelOperationSelectionProps = {
    modelType: ModelType;
};

export const ModelOperationSelection: React.FC<
    ModelOperationSelectionProps
> = ({ modelType }) => {
    const declareModelCards = [
        <MiningChoiceCard
            key="Conformance"
            name="Conformance"
            svgLogo={<img src={ChecklistLogo} alt="Conformance Check" />}
            targetUrl={TargetURL.CONFORMANCE}
        />,
    ];

    const imperativeModelCards = [
        <MiningChoiceCard
            key="Conformance"
            name="Conformance"
            svgLogo={<img src={ChecklistLogo} alt="Conformance Check" />}
            targetUrl={TargetURL.OPTIMAL_ALIGNMENT}
        />,
    ];

    return (
        <div className="h-full w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex items-center justify-center gap-4 p-10">
            {modelType === ModelType.DECLARATIVE
                ? declareModelCards
                : imperativeModelCards}
        </div>
    );
};
