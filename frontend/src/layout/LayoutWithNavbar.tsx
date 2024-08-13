import { NavBar } from '@/components/ui/NavBar';
import React from 'react';

type LayoutWithNavbarProps = {
    children: React.ReactNode;
};

export const LayoutWithNavbar: React.FC<LayoutWithNavbarProps> = ({
    children,
}) => {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-col items-center grow z-10">
                {children}
            </div>
        </div>
    );
};
