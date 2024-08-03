import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Outlet />
        </div>
    );
};
