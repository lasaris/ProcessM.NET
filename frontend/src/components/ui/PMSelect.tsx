import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import React from 'react';

export type SelectOption = {
    value: string;
    title: string;
};

export type PMSelectProps = {
    options: SelectOption[];
    placeholder: string;
    className?: string;
};

export const PMSelect: React.FC<PMSelectProps> = ({
    options,
    placeholder,
    className,
}) => {
    return (
        <Select>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => {
                    return (
                        <SelectItem key={option.value} value={option.value}>
                            {option.title}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
