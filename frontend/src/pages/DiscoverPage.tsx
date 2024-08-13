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
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DiscoverPage: React.FC = () => {
    const [selectedConstraints, setSelectedConstraints] = useState<string[]>(
        []
    );
    const navigate = useNavigate();
    const { logName } = useParams();

    const continueWithSelected = () => {
        if (logName) {
            navigate(
                TargetURL.DISCOVER_CONFIGURE_CONSTRAINTS.replace(
                    ':logName',
                    logName
                ),
                { state: { selectedConstraints } }
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
                defaultValue={selectedConstraints}
                onValueChange={setSelectedConstraints}
                maxCount={8}
            />
            <Accordion className="w-3/4" type="single" collapsible>
                {items}
            </Accordion>
            <div className="sticky bottom-4 flex justify-end w-full px-4">
                <Button onClick={continueWithSelected}>Continue!</Button>
            </div>
        </div>
    );
};
