import { ConstraintConfigure } from '@/components/ui/ConstraintConfigure';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Accordion } from '@/components/ui/ShadCN/accordion';
import { Button } from '@/components/ui/ShadCN/button';
import { useToast } from '@/components/ui/use-toast';
import { useLogsDb } from '@/hooks/useLogsDb';
import { TargetURL } from '@/router';
import { useDiscoverStore } from '@/store/useDiscoverStore';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

export const DiscoverConfigure: React.FC = () => {
    const { configurations, importedEventLog } = useDiscoverStore();
    const { toast } = useToast();
    const navigate = useNavigate();
    const { fetchSingleLog } = useLogsDb();
    const { entityName } = useParams();
    const importedEventLogDb = useAsync(
        () => fetchSingleLog(entityName || ''),
        []
    );

    if (importedEventLogDb.loading) {
        return <LoadingSpinner />;
    }

    if (importedEventLogDb.error) {
        toast({
            title: 'Error',
            description: 'Unable to fetch the log from the database',
            variant: 'destructive',
        });
        return <ErrorPage />;
    }

    const handleSubmit = () => {
        if (entityName && configurations.length > 0) {
            navigate(
                TargetURL.DISCOVER_VIEW_MODEL.replace(':entityName', entityName)
            );
        }
    };

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

    const selectConstraints = () => {
        if (entityName) {
            navigate(
                TargetURL.DISCOVER_SELECT_CONSTRAINTS.replace(
                    ':entityName',
                    entityName
                )
            );
        }
    };

    const items = configurations.map((constraint) => {
        return (
            <ConstraintConfigure
                key={constraint.template}
                constraint={constraint}
            />
        );
    });

    if (!importedEventLog) {
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

    if (configurations.length === 0) {
        return (
            <div className="flex flex-col h-full w-full items-center justify-center gap-4 p-10 sm:px-14 md:px-20 lg:px-32 md:py-20 overflow-x-hidden text-justify">
                <p>
                    There are no constraints selected for the current log. Go
                    back to the constraints selection.
                </p>
                <Button onClick={selectConstraints}>Select Constraints!</Button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Configure DECLARE Constraints
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Adjust the parameters for the selected DECLARE constraints.
                </p>
            </div>
            <div className="relative w-full h-full flex flex-col items-center justify-between gap-6">
                <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
                    <Accordion className="w-full" type="single" collapsible>
                        {items}
                    </Accordion>
                </div>

                <div className="sticky bottom-4 flex justify-end w-full px-4 mt-4">
                    <div className="sticky bottom-4 flex justify-end w-full px-4">
                        <Button onClick={handleSubmit}>Continue!</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
