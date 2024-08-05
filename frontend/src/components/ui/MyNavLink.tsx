import { TargetURL } from '@/router';
import React from 'react';
import { NavLink } from 'react-router-dom';

type MyNavLinkProps = {
    targetUrl: TargetURL;
    title: string;
};

export const MyNavLink: React.FC<MyNavLinkProps> = ({ targetUrl, title }) => {
    return (
        <NavLink
            to={targetUrl}
            className={({ isActive }) =>
                'scroll-m-20 text-xl font-semibold tracking-tight hover:border-b-2 ' +
                (isActive ? 'border-b-2' : '')
            }
            end
        >
            {title}
        </NavLink>
    );
};
