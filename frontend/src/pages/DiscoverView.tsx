import { DeclareModel } from '@/components/ui/DeclareModel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { UnableToLoad } from '@/components/ui/UnableToLoad';
import { useDiscover } from '@/hooks/apiHooks/useDiscover';
import { ModelType } from '@/models/ImperativeModel';
import { DiscoveredModel } from '@/models/JsonModel';
import React from 'react';
import { useParams } from 'react-router-dom';

export const DiscoverView: React.FC = () => {
    const { entityName } = useParams();
    const { data, isLoading, isError } = useDiscover(entityName || '');

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || !data) {
        return <UnableToLoad />;
    }

    if (data) {
        const parsed: DiscoveredModel = {
            declareModel: data.data.model,
            dotGraph: data.data.dotGraph,
        };

        console.log(parsed);

        return (
            <div className="relative w-full h-full flex flex-col items-center justify-between">
                <DeclareModel dotGraph={parsed.dotGraph} />
                <div className="sticky bottom-4 flex justify-end w-full px-4">
                    <SaveModelDialog
                        model={parsed.dotGraph}
                        type={ModelType.DECLARATIVE}
                        declareModelJson={JSON.stringify(parsed.declareModel)}
                    />
                </div>
            </div>
        );
    }

    return <div>Unable to parse the json</div>;
};
