import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/ShadCN/accordion';
import { Checkbox } from '@/components/ui/ShadCN/checkbox';
import { Input } from '@/components/ui/ShadCN/input';
import { Label } from '@/components/ui/ShadCN/label';
import {
    DiscoverConfiguration,
    useDiscoverStore,
} from '@/store/useDiscoverStore';
import { CheckedState } from '@radix-ui/react-checkbox';
import React from 'react';

type ConstraintConfigureProps = {
    constraint: DiscoverConfiguration;
};

export const ConstraintConfigure: React.FC<ConstraintConfigureProps> = ({
    constraint,
}) => {
    const { editCheckVacuously, editEvents, editInstances } =
        useDiscoverStore();

    return (
        <AccordionItem key={constraint.template} value={constraint.template}>
            <AccordionTrigger>{constraint.template}</AccordionTrigger>
            <AccordionContent className="grid grid-cols-6 gap-4 py-8 px-4">
                <Label
                    htmlFor={constraint.template + 'percentageOfInstances'}
                    className="flex items-center col-span-6 md:col-span-1"
                >
                    Percentage of instances
                </Label>
                <Input
                    id={constraint.template + 'percentageOfInstances'}
                    type="number"
                    max={100}
                    min={0}
                    className="col-span-6 md:col-span-5"
                    value={constraint.poi}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editInstances(constraint.template, +e.target.value)
                    }
                />
                <Label
                    htmlFor={constraint.template + 'percentageOfEvents'}
                    className="flex items-center col-span-6 md:col-span-1"
                >
                    Percentage of events
                </Label>
                <Input
                    id={constraint.template + 'percentageOfEvents'}
                    type="number"
                    max={100}
                    min={0}
                    className="col-span-6 md:col-span-5"
                    value={constraint.poe}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editEvents(constraint.template, +e.target.value)
                    }
                />
                <Label
                    className="flex items-center col-span-6 md:col-span-1"
                    htmlFor={constraint.template + 'checkVacuously'}
                >
                    Check Vacuously
                </Label>
                <div className="col-span-6 md:col-span-5">
                    <Checkbox
                        id={constraint.template + 'checkVacuously'}
                        checked={constraint.checkVacuously}
                        onCheckedChange={(e: CheckedState) => {
                            editCheckVacuously(constraint.template, e);
                        }}
                        className="w-6 h-6"
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
