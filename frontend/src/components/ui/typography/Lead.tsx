import React from 'react';

type LeadProps = {
    children: React.ReactNode;
    className?: string;
};

export const Lead: React.FC<LeadProps> = ({ children, className }) => {
    return (
        <p className={`text-xl text-muted-foreground ${className}`}>
            {children}
        </p>
    );
};
