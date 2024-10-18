import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SelectCaseIdActivityForm } from '@/components/ui/SelectCaseIdActivityForm';
import { useToast } from '@/components/ui/use-toast';
import { useLogsDb } from '@/hooks/useLogsDb';
import { TargetURL } from '@/router';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

export const DiscoverConfigureLog: React.FC = () => {
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
        if (entityName) {
            navigate(
                TargetURL.DISCOVER_SELECT_CONSTRAINTS.replace(
                    ':entityName',
                    entityName
                )
            );
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {importedEventLogDb.result && (
                <SelectCaseIdActivityForm
                    importedEventLog={importedEventLogDb.result.importedLog}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};
