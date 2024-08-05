import { TargetURL } from '@/router';
import React from 'react';
import { MyNavLink } from './MyNavLink';

export const NavBar: React.FC = () => {
    return (
        <nav className="flex flex-row h-16 items-center justify-between gap-3 px-4 border-b">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                ProcessM.NET
            </h2>
            <div className="flex flex-row gap-8">
                <MyNavLink targetUrl={TargetURL.IMPERATIVE} title="Logs" />
                <MyNavLink
                    targetUrl={TargetURL.IMPERATIVE_MODELS}
                    title="Models"
                />
                <MyNavLink targetUrl={TargetURL.IMPERATIVE_MINE} title="Mine" />
            </div>
        </nav>
    );
};
