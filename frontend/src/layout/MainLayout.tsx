import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Outlet />
        </div>
    );
};
