import { Label } from '@/components/ui/ShadCN/label';
import { Slider } from '@/components/ui/ShadCN/slider';
import React, { Dispatch, ReactNode } from 'react';
import { InfoTooltip } from './common/InfoTooltip';

type PMSliderProps = {
    label: string;
    maxValue: number;
    changeValue: Dispatch<React.SetStateAction<number>>;
    value: number;
    step?: number;
    className?: string;
    tooltipDescription?: ReactNode;
};

export const PMSlider: React.FC<PMSliderProps> = ({
    label,
    maxValue,
    changeValue,
    value,
    step = 1,
    className,
    tooltipDescription,
}) => {
    if (tooltipDescription) {
        return (
            <div className="flex flex-col gap-3 w-full">
                <InfoTooltip tooltipContent={tooltipDescription}>
                    <Label>{label}</Label>
                </InfoTooltip>
                <Slider
                    defaultValue={[value]}
                    onValueChange={([val]) => changeValue(val)}
                    max={maxValue}
                    step={step}
                    className={className}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label>{label}</Label>
            <Slider
                defaultValue={[value]}
                onValueChange={([val]) => changeValue(val)}
                max={maxValue}
                step={step}
                className={className}
            />
        </div>
    );
};
