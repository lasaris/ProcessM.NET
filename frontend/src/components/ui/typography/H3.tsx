import React, { ReactNode } from 'react';

type H3Props = {
    children: ReactNode;
    className?: string;
};

export const H3: React.FC<H3Props> = ({ children, className }) => {
    return (
        <h3
            className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
        >
            {children}
        </h3>
    );
};
