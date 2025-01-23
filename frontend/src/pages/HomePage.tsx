import { HomePageDescription } from '@/components/ui/HomePageDescription';
import { Button } from '@/components/ui/ShadCN/button';
import { TargetURL } from '@/router';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const startMining = () => {
        navigate(TargetURL.LOGS);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-10 sm:px-14 md:px-20 lg:px-32 md:py-20 overflow-x-hidden text-justify">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                ProcessM.NET App
            </h1>
            <HomePageDescription />
            <Button
                onClick={startMining}
                className="animate-pulse absolute right-4 bottom-4 md:right-10 md:bottom-10"
            >
                Start Mining!
            </Button>
        </div>
    );
};
