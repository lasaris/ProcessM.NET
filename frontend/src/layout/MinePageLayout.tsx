import React, { ReactNode } from 'react';

type MinePageLayoutProps = {
    children: ReactNode;
};

export const MinePageLayout: React.FC<MinePageLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col w-full h-full md:flex-row">
            {children}
        </div>
    );
};
