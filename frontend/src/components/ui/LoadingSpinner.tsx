import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <img src={SpinnerLogo} alt="loader" />
        </div>
    );
};
