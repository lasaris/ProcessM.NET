import React from 'react';
import { useNavigate } from 'react-router-dom';

type MiningTypeCardProps = {
    title: string;
    description: string;
    targetUrl: string;
};

export const MiningTypeCard: React.FC<MiningTypeCardProps> = ({
    title,
    description,
    targetUrl,
}) => {
    const navigate = useNavigate();

    const onSelect = () => {
        navigate(targetUrl);
    };

    return (
        <div
            onClick={onSelect}
            className="w-80 sm:w-[30rem] md:w-80 lg:w-96 xl:w-[30rem] h-7/8 m-4 p-4 bg-slate-200 animate-jump-in animate-once rounded-lg flex flex-col items-center justify-center hover:shadow-2xl"
        >
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {title}
            </h2>
            <p className="p-4 text-justify">{description}</p>
        </div>
    );
};
