import { Label } from '@/components/ui/ShadCN/label';
import { Switch } from '@/components/ui/ShadCN/switch';
import React, { Dispatch } from 'react';

export type SwitchWithLabelProps = {
    label: string;
    value: boolean;
    onChange: Dispatch<React.SetStateAction<boolean>>;
    className?: string;
};

export const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
    label,
    onChange,
    value,
    className,
}) => {
    return (
        <div
            className={`flex items-center justify-start space-x-2 ${className}`}
        >
            <Switch id={label} checked={value} onCheckedChange={onChange} />
            <Label htmlFor={label}>{label}</Label>
        </div>
    );
};
