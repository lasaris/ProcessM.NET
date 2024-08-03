import React from 'react';

export const NavBar: React.FC = () => {
    return (
        <nav className="flex flex-row h-16 items-center justify-between gap-3 px-4 bg-red-300">
            <div>ProcessM.NET</div>
            <div className="flex flex-row">
                <div>b</div>
                <div>c</div>
            </div>
        </nav>
    );
};
