import { Healthiness } from '@/models/TraceEvaluation';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../accordion';
import { Lead } from '../typography/Lead';
import { HealthinessProgress } from './HealthinessProgress';

type ConformanceResultHealthinessAccordionProps = {
    title: string;
    subtitle?: React.ReactNode;
    healthiness: Healthiness;
};

export const ConformanceResultHealthinessAccordion: React.FC<
    ConformanceResultHealthinessAccordionProps
> = ({ title, subtitle, healthiness }) => {
    return (
        <div className="flex flex-col gap-4">
            <Lead className="underline">{title}</Lead>
            {subtitle}
            <Accordion className="w-full" type="single" collapsible>
                <AccordionItem value="activationSparsity">
                    <AccordionTrigger>Activation Sparsity</AccordionTrigger>
                    <AccordionContent>
                        <HealthinessProgress
                            higherIsBetter={true}
                            value={healthiness.activationSparsity}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="FulfillmentRatio">
                    <AccordionTrigger>Fulfillment Ratio</AccordionTrigger>
                    <AccordionContent>
                        <HealthinessProgress
                            higherIsBetter={true}
                            value={healthiness.fulfillmentRation}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ViolationRatio">
                    <AccordionTrigger>Violation Ratio</AccordionTrigger>
                    <AccordionContent>
                        <AccordionContent>
                            <HealthinessProgress
                                higherIsBetter={false}
                                value={healthiness.violationRation}
                            />
                        </AccordionContent>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ConflictRatio">
                    <AccordionTrigger>Conflict Ratio</AccordionTrigger>
                    <AccordionContent>
                        <AccordionContent>
                            <HealthinessProgress
                                higherIsBetter={false}
                                value={healthiness.conflictRation}
                            />
                        </AccordionContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
