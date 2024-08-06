import { NavBar } from '@/components/ui/NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutWithNavbar: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-full">
                <Outlet />
            </div>
        </div>
    );
};
