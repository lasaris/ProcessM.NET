import { DeclareModel } from '@/components/ui/DeclareModel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { Button } from '@/components/ui/ShadCN/button';
import { useDiscover } from '@/hooks/apiHooks/useDiscover';
import { ModelType } from '@/models/ImperativeModel';
import { DiscoveredModel } from '@/models/JsonModel';
import { TargetURL } from '@/router';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DiscoverView: React.FC = () => {
    const { entityName } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useDiscover();

    const configureEventLog = () => {
        if (entityName) {
            navigate(
                TargetURL.DISCOVER_CONFIGURE_CASE_ACTIVITY.replace(
                    ':entityName',
                    entityName
                )
            );
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col h-full w-full items-center justify-center gap-4 p-10 sm:px-14 md:px-20 lg:px-32 md:py-20 overflow-x-hidden text-justify">
                <p>
                    The event log is not configured. You need to select Case ID
                    and Activity column.
                </p>
                <Button onClick={configureEventLog}>
                    Configure Event Log!
                </Button>
            </div>
        );
    }

    if (data) {
        const parsed: DiscoveredModel = {
            declareModel: data.data.model,
            dotGraph: data.data.dotGraph,
        };
        return (
            <div className="relative w-full h-full flex flex-col items-center justify-between p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Declarative Process Model
                    </h1>
                    <p className="text-gray-600 max-w-3xl">
                        This model visualizes the declarative process discovered
                        from the event log. It represents the activities and
                        constraints between them. You can further explore the
                        model, analyze the dependencies, and save it for future
                        use.
                    </p>
                </div>

                <div className="w-full max-w-5xl bg-white p-6 shadow-lg rounded-lg mb-6">
                    <DeclareModel dotGraph={parsed.dotGraph} />
                </div>

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
