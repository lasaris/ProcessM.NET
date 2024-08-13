import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckedState } from '@radix-ui/react-checkbox';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

type constraintConfig = {
    constraintName: string;
    percentageOfInstances: number;
    percentageOfEvents: number;
    checkVacuously: boolean;
};

export const DiscoverConfigure: React.FC = () => {
    const { state } = useLocation();
    const [configuration, setConfiguration] = useState<constraintConfig[]>(
        state
            ? state.selectedConstraints?.map((constraint: string) => {
                  return {
                      constraintName: constraint,
                      percentageOfInstances: 100,
                      percentageOfEvents: 100,
                      checkVacuously: true,
                  };
              })
            : []
    );

    const onEventsInputChange = (constraintName: string, value: number) => {
        setConfiguration((prevState) =>
            prevState.map((constraint) => {
                if (constraint.constraintName !== constraintName) {
                    return constraint;
                }

                constraint.percentageOfEvents = value;
                return constraint;
            })
        );
    };

    const onInstancesInputChange = (constraintName: string, value: number) => {
        setConfiguration((prevState) =>
            prevState.map((constraint) => {
                if (constraint.constraintName !== constraintName) {
                    return constraint;
                }

                constraint.percentageOfInstances = value;
                return constraint;
            })
        );
    };

    const onCheckedCheckVacuously = (
        constraintName: string,
        value: boolean
    ) => {
        setConfiguration((prevState) =>
            prevState.map((constraint) => {
                if (constraint.constraintName !== constraintName) {
                    return constraint;
                }

                constraint.checkVacuously = value;
                return constraint;
            })
        );
    };

    const items = configuration.map((constraint) => {
        return (
            <AccordionItem
                key={constraint.constraintName}
                value={constraint.constraintName}
            >
                <AccordionTrigger>{constraint.constraintName}</AccordionTrigger>
                <AccordionContent className="flex flex-row gap-2">
                    <div>
                        <Label
                            htmlFor={
                                constraint.constraintName +
                                'percentageOfInstances'
                            }
                        >
                            Percentage of instances
                        </Label>
                        <Input
                            id={
                                constraint.constraintName +
                                'percentageOfInstances'
                            }
                            type="number"
                            max={100}
                            min={0}
                            value={constraint.percentageOfInstances}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                onInstancesInputChange(
                                    constraint.constraintName,
                                    +e.target.value
                                )
                            }
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor={
                                constraint.constraintName + 'percentageOfEvents'
                            }
                        >
                            Percentage of events
                        </Label>
                        <Input
                            id={
                                constraint.constraintName + 'percentageOfEvents'
                            }
                            type="number"
                            max={100}
                            min={0}
                            value={constraint.percentageOfEvents}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                onEventsInputChange(
                                    constraint.constraintName,
                                    +e.target.value
                                )
                            }
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor={
                                constraint.constraintName + 'checkVacuously'
                            }
                        >
                            Check Vacuously
                        </Label>
                        <Checkbox
                            id={constraint.constraintName + 'checkVacuously'}
                            checked={constraint.checkVacuously}
                            onCheckedChange={(e: CheckedState) =>
                                onCheckedCheckVacuously(
                                    constraint.constraintName,
                                    !!e.valueOf()
                                )
                            }
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    });

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(configuration);
    };

    return (
        <div className="h-full w-full flex flex-col pt-6 gap-4 items-center">
            <form onSubmit={handleSubmit} className="w-3/4">
                <Accordion className="w-full" type="single" collapsible>
                    {items}
                </Accordion>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};
