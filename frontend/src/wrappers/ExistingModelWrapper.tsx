import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useModelsDb } from '@/hooks/useModelsDb';
import { TargetURL } from '@/router';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { Navigate, useParams } from 'react-router-dom';

type ExistingModelWrapperProps = {
    children: React.ReactNode;
};

export const ExistingModelWrapper: React.FC<ExistingModelWrapperProps> = ({
    children,
}) => {
    const { fetchSingleModel } = useModelsDb();
    const { entityName } = useParams();
    const { loading, error } = useAsync(
        () => fetchSingleModel(entityName || ''),
        []
    );

    if (error) {
        return <Navigate to={TargetURL.MODELS} />;
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return children;
};
