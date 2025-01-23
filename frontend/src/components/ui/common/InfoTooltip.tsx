import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { InfoIcon } from 'lucide-react';
import React, { ReactNode } from 'react';

type InfoTooltipProps = {
    children: ReactNode;
    tooltipContent: ReactNode;
};

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
    children,
    tooltipContent,
}) => {
    return (
        <div className="flex flex-row gap-3 w-full">
            <div>{children}</div>
            <TooltipWrapper tooltipContent={tooltipContent}>
                <InfoIcon />
            </TooltipWrapper>
        </div>
    );
};
