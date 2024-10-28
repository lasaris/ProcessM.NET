import { TargetURL } from '@/router';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type MiningChoiceCardProps = {
    name: string;
    svgLogo: React.ReactNode;
    targetUrl: TargetURL;
    description?: string;
};

export const MiningChoiceCard: React.FC<MiningChoiceCardProps> = ({
    name,
    svgLogo,
    targetUrl,
    description,
}) => {
    const navigate = useNavigate();
    const { entityName } = useParams();

    const selectOption = () => {
        const destination = targetUrl;

        if (entityName) {
            navigate(destination.replace(':entityName', entityName));
        }
    };

    return (
        <div
            onClick={selectOption}
            className="w-full h-64 xl:h-96 bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-4 gap-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
            <h4 className="text-xl font-semibold tracking-tight text-center">
                {name}
            </h4>
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
                {svgLogo}
            </div>
            {description && (
                <p className="text-sm text-gray-600 text-center mt-1">
                    {description}
                </p>
            )}
        </div>
    );
};
