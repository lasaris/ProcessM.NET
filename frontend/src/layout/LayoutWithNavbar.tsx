import { NavBar } from '@/components/ui/NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutWithNavbar: React.FC = () => {
    return (
        <div className="h-screen flex flex-col md:overflow-y-hidden">
            <NavBar />
            <div className="flex flex-col items-center grow z-10">
                <Outlet />
            </div>
        </div>
    );
};
