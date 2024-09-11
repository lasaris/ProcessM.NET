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

    console.log(data);

    if (data) {
        console.log(data.data);
        const parsed: DiscoveredModel = {
            treeModel: data.data.treeModel,
            declareModel: data.data.declareModel,
        };

        return (
            <div className="relative w-full h-full flex flex-col items-center justify-between">
                <DeclareModel treeModel={parsed.treeModel} />
                <div className="sticky bottom-4 flex justify-end w-full px-4">
                    <SaveModelDialog
                        model={parsed.treeModel}
                        type={ModelType.DECLARATIVE}
                        declareModelJson={JSON.stringify(parsed.declareModel)}
                    />
                </div>
            </div>
        );
    }

    return <div>Unable to parse the json</div>;
};
