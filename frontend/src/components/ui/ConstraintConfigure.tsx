import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        <AccordionItem
            key={constraint.constraintName}
            value={constraint.constraintName}
        >
            <AccordionTrigger>{constraint.constraintName}</AccordionTrigger>
            <AccordionContent className="grid grid-cols-6 gap-4 py-8 px-4">
                <Label
                    htmlFor={
                        constraint.constraintName + 'percentageOfInstances'
                    }
                    className="flex items-center col-span-6 md:col-span-1"
                >
                    Percentage of instances
                </Label>
                <Input
                    id={constraint.constraintName + 'percentageOfInstances'}
                    type="number"
                    max={100}
                    min={0}
                    className="col-span-6 md:col-span-5"
                    value={constraint.percentageOfInstances}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editInstances(
                            constraint.constraintName,
                            +e.target.value
                        )
                    }
                />
                <Label
                    htmlFor={constraint.constraintName + 'percentageOfEvents'}
                    className="flex items-center col-span-6 md:col-span-1"
                >
                    Percentage of events
                </Label>
                <Input
                    id={constraint.constraintName + 'percentageOfEvents'}
                    type="number"
                    max={100}
                    min={0}
                    className="col-span-6 md:col-span-5"
                    value={constraint.percentageOfEvents}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editEvents(constraint.constraintName, +e.target.value)
                    }
                />
                <Label
                    className="flex items-center col-span-6 md:col-span-1"
                    htmlFor={constraint.constraintName + 'checkVacuously'}
                >
                    Check Vacuously
                </Label>
                <div className="col-span-6 md:col-span-5">
                    <Checkbox
                        id={constraint.constraintName + 'checkVacuously'}
                        checked={constraint.checkVacuously}
                        onCheckedChange={(e: CheckedState) => {
                            editCheckVacuously(constraint.constraintName, e);
                        }}
                        className="w-6 h-6"
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
