import React from 'react';

type H4Props = {
    children: React.ReactNode;
};

export const H4: React.FC<H4Props> = ({ children }) => {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    );
};
