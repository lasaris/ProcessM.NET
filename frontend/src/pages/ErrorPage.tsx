import { Button } from '@/components/ui/ShadCN/button';
import { H3 } from '@/components/ui/typography/H3';
import { TargetURL } from '@/router';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const onNaviagteHandler = () => {
        navigate(TargetURL.HOME);
    };

    return (
        <div className="flex flex-col gap-3 justify-center items-center w-screen h-screen">
            <H3>Error 404: Not found!</H3>
            <Button onClick={onNaviagteHandler}>Home!</Button>
        </div>
    );
};
