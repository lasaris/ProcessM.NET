import { Button } from '@/components/ui/ShadCN/button';
import { Download } from '@/icons/Download';
import React from 'react';

type ExportButtonProps = {
    title: string;
    exportFunction: () => void;
    className?: string;
};

export const ExportButton: React.FC<ExportButtonProps> = ({
    title,
    exportFunction,
    className,
}) => {
    return (
        <Button
            className={`flex w-1/2 gap-2 ${className}`}
            onClick={exportFunction}
        >
            <Download />
            {title}
        </Button>
    );
};
