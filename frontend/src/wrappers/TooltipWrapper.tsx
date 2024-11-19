import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/ShadCN/tooltip';
import React from 'react';

type TooltipWrapperProps = {
    tooltipContent: React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'left' | 'bottom' | undefined;
};

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
    tooltipContent,
    children,
    side,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side}>
                    <div className="max-w-60">{tooltipContent}</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
