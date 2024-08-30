import { NavBar } from '@/components/ui/NavBar';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutWithNavbar: React.FC = () => {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-col items-center grow z-10">
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
};
