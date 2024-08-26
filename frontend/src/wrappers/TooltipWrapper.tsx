import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';

type TooltipWrapperProps = {
    tooltipTitle: string;
    children: React.ReactNode;
};

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
    tooltipTitle,
    children,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipTitle}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
