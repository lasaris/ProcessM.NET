import React from 'react';
import { NavLink } from 'react-router-dom';

type MyNavLinkProps = {
    targetUrl: string;
    title: string;
};

export const MyNavLink: React.FC<MyNavLinkProps> = ({ targetUrl, title }) => {
    return (
        <NavLink
            to={targetUrl}
            className={() =>
                `scroll-m-20 mx-4 text-lg font-medium tracking-wide relative inline-block`
            }
        >
            {title}
        </NavLink>
    );
};
