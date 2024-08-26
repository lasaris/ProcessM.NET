import React, { ReactNode } from 'react';

type ConformanceCardProps = {
    children: ReactNode;
};

export const ConformanceCard: React.FC<ConformanceCardProps> = ({
    children,
}) => {
    return (
        <div className="w-full h-full bg-slate-300 rounded-lg p-4">
            {children}
        </div>
    );
};
