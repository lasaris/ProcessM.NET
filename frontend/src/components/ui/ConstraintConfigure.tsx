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
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Info } from 'lucide-react';
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
            key={constraint.template}
            value={constraint.template}
            className="border border-gray-200 rounded-lg mb-4"
        >
            <AccordionTrigger className="rounded-t-lg shadow-md px-4 py-3 font-semibold text-left">
                {constraint.template}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-6 gap-4 py-6 px-4 bg-white rounded-b-lg">
                <Label
                    htmlFor={constraint.template + 'percentageOfInstances'}
                    className="flex items-center col-span-6 md:col-span-2 font-semibold gap-2"
                >
                    Percentage of Instances
                    <TooltipWrapper
                        tooltipContent={
                            <p>
                                How many instances a constraint must satisfy to
                                be included in the resulting model
                            </p>
                        }
                    >
                        <Info />
                    </TooltipWrapper>
                </Label>
                <Input
                    id={constraint.template + 'percentageOfInstances'}
                    type="number"
                    max={100}
                    min={0}
                    className="col-span-6 md:col-span-4 border border-gray-300 rounded-md p-2"
                    value={constraint.poi}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editInstances(constraint.template, +e.target.value)
                    }
                />

                <Label
                    htmlFor={constraint.template + 'percentageOfEvents'}
                    className="flex items-center col-span-6 md:col-span-2 font-semibold gap-2"
                >
                    Percentage of Events
                    <TooltipWrapper
                        tooltipContent={
                            <p>
                                How frequently events should occur in the log to
                                be included in a resulting model.
                            </p>
                        }
                    >
                        <Info />
                    </TooltipWrapper>
                </Label>
                <Input
                    id={constraint.template + 'percentageOfEvents'}
                    type="number"
                    max={100}
                    min={0}
                    className="col-span-6 md:col-span-4 border border-gray-300 rounded-md p-2"
                    value={constraint.poe}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editEvents(constraint.template, +e.target.value)
                    }
                />

                <Label
                    htmlFor={constraint.template + 'checkVacuously'}
                    className="flex items-center col-span-6 md:col-span-2 font-semibold gap-2"
                >
                    Check Vacuously
                    <TooltipWrapper
                        tooltipContent={
                            <p>
                                If true, the discovery process will consider
                                this constraint, even if it isn't triggered in
                                the process
                            </p>
                        }
                    >
                        <Info />
                    </TooltipWrapper>
                </Label>
                <div className="col-span-6 md:col-span-4 flex items-center">
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
