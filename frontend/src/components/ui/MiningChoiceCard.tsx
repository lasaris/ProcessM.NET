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
    const { logName } = useParams();

    const selectLog = () => {
        const destination = targetUrl;

        if (logName) {
            navigate(destination.replace(':logName', logName));
        }
    };

    return (
        <div
            onClick={selectLog}
            className="w-full h-40 bg-slate-300 flex flex-col items-center justify-center rounded-lg hover:shadow-xl hover:cursor-pointer gap-3"
        >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {name}
            </h4>
            <div className="w-20 h-20">{svgLogo}</div>
        </div>
    );
};
