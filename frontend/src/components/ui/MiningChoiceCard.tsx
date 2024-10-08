import { TargetURL } from '@/router';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type MiningChoiceCardProps = {
    name: string;
    svgLogo: React.ReactNode;
    targetUrl: TargetURL;
};

export const MiningChoiceCard: React.FC<MiningChoiceCardProps> = ({
    name,
    svgLogo,
    targetUrl,
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
            className="w-full h-40 bg-slate-300 flex flex-col items-center justify-center rounded-lg hover:shadow-xl hover:cursor-pointer gap-3"
        >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
                {name}
            </h4>
            <div className="w-20 h-20">{svgLogo}</div>
        </div>
    );
};
