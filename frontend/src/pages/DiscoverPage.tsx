import { MultiSelect } from '@/components/ui/MultiSelect';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    DeclareConstraintType,
    DeclareConstraints,
} from '@/models/DeclareConstraints';
import { TargetURL } from '@/router';
import {
    DiscoverConfiguration,
    useDiscoverStore,
} from '@/store/useDiscoverStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DiscoverPage: React.FC = () => {
    const { configurations, setConfigurations } = useDiscoverStore();
    const navigate = useNavigate();
    const { logName } = useParams();

    const continueWithSelected = () => {
        if (logName && configurations.length > 0) {
            navigate(
                TargetURL.DISCOVER_CONFIGURE_CONSTRAINTS.replace(
                    ':logName',
                    logName
                )
            );
        }
    };

    const items = DeclareConstraints.map((constraint) => {
        return (
            <AccordionItem key={constraint.name} value={constraint.name}>
                <AccordionTrigger>{constraint.name}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    <div>
                        <span className="font-bold pr-3">Type:</span>
                        {constraint.type === DeclareConstraintType.RELATIONAL
                            ? 'Relational'
                            : constraint.type ===
                                DeclareConstraintType.EXISTENTIAL
                              ? 'Existential'
                              : 'Not Relational'}
                    </div>
                    <div>
                        <span className="font-bold pr-3">Description:</span>
                        {constraint.description}
                    </div>
                    <div>
                        <span className="font-bold pr-3">LTL Expression:</span>
                        {constraint.ltlExpression}
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    });

    const options = DeclareConstraints.map((constraint) => {
        return {
            label: constraint.name,
            value: constraint.name,
        };
    });

    return (
        <div className="h-full w-full flex flex-col pt-6 gap-4 items-center justify-center">
            <MultiSelect
                className="w-3/4"
                options={options}
                defaultValue={configurations.map(
                    (configuration) => configuration.constraintName
                )}
                onValueChange={(constraints) => {
                    const discoverConfigs: DiscoverConfiguration[] =
                        constraints.map((constraint) => {
                            return {
                                constraintName: constraint,
                                checkVacuously: true,
                                percentageOfEvents: 100,
                                percentageOfInstances: 100,
                            };
                        });

                    setConfigurations(discoverConfigs);
                }}
                maxCount={8}
            />
            <Accordion className="w-3/4" type="single" collapsible>
                {items}
            </Accordion>
            <div className="sticky bottom-4 flex justify-end w-full px-4">
                {configurations.length > 0 && (
                    <Button onClick={continueWithSelected}>Continue!</Button>
                )}
            </div>
        </div>
    );
};
