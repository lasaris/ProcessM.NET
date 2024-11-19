import { Button } from '@/components/ui/ShadCN/button';
import { H3 } from '@/components/ui/typography/H3';
import { TargetURL } from '@/router';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorPageProps = {
    errorMessage?: string;
};

export const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
    const navigate = useNavigate();

    const onNaviagteHandler = () => {
        navigate(TargetURL.HOME);
    };

    return (
        <div className="flex flex-col gap-3 justify-center items-center w-screen h-screen">
            <H3>
                {errorMessage
                    ? `The error message: ${errorMessage}`
                    : 'Error 404: Not found!'}
            </H3>
            <Button onClick={onNaviagteHandler}>Home!</Button>
        </div>
    );
};
