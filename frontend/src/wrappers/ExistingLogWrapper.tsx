import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLogsDb } from '@/hooks/useLogsDb';
import { TargetURL } from '@/router';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { Navigate, useParams } from 'react-router-dom';

type ExistingLogWrapperProps = {
    children: React.ReactNode;
};

export const ExistingLogWrapper: React.FC<ExistingLogWrapperProps> = ({
    children,
}) => {
    const { fetchSingleLog } = useLogsDb();
    const { entityName } = useParams();
    const { loading, error } = useAsync(
        () => fetchSingleLog(entityName || ''),
        []
    );

    if (error) {
        return <Navigate to={TargetURL.LOGS} />;
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return children;
};
