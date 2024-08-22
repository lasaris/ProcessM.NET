import { ConformanceCard } from '@/components/ui/ConformanceCard';
import { DeclareModel } from '@/components/ui/DeclareModel';
import { H3 } from '@/components/ui/typography/H3';
import { jsonModelExample } from '@/examples/exampleJsonModels/example';
import { safeJsonParse } from '@/helpers/safeJsonParse';
import { JsonModel } from '@/models/JsonModel';
import React from 'react';

export const ConformancePage: React.FC = () => {
    const parsed = safeJsonParse<JsonModel>(jsonModelExample);

    return (
        <div className="h-full w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 place-items-center items-start gap-4 p-10">
            <ConformanceCard>
                <H3 className="flex justify-center">Traces</H3>
            </ConformanceCard>
            <ConformanceCard>
                <H3 className="flex justify-center">Evaluation</H3>
            </ConformanceCard>
            <ConformanceCard>
                <H3 className="flex justify-center">Model</H3>
                {parsed ? (
                    <DeclareModel className="w-full" model={parsed} />
                ) : (
                    <div>Unable to parse the model</div>
                )}
            </ConformanceCard>
        </div>
    );
};
