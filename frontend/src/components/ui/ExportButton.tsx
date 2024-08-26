import { Download } from '@/icons/Download';
import React from 'react';
import { Button } from './button';

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
        <Button className={`flex gap-2 ${className}`} onClick={exportFunction}>
            <Download />
            {title}
        </Button>
    );
};
