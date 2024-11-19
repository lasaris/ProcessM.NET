import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/ShadCN/accordion';
import { Healthiness } from '@/models/TraceEvaluation';
import React from 'react';
import { Lead } from '../typography/Lead';
import { HealthinessProgress } from './HealthinessProgress';

type ConformanceResultHealthinessAccordionProps = {
    title: string;
    subtitle?: React.ReactNode;
    healthiness: Healthiness;
    description: React.ReactNode;
};

export const ConformanceResultHealthinessAccordion: React.FC<
    ConformanceResultHealthinessAccordionProps
> = ({ title, subtitle, healthiness, description }) => {
    return (
        <div className="flex flex-col gap-4">
            <Lead className="underline">{title}</Lead>
            {description}
            {subtitle}
            {healthiness && (
                <Accordion className="w-full" type="single" collapsible>
                    <AccordionItem value="activationSparsity">
                        <AccordionTrigger>Activation Sparsity</AccordionTrigger>
                        <AccordionContent>
                            <div className="p-3">
                                Shows how frequently constraints are triggered
                                in the process
                            </div>
                            <HealthinessProgress
                                higherIsBetter={true}
                                value={healthiness.activationSparsity}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="FulfillmentRatio">
                        <AccordionTrigger>Fulfillment Ratio</AccordionTrigger>
                        <AccordionContent>
                            <div className="p-3">
                                Shows how many of these triggers met the desired
                                conditions (good behavior)
                            </div>
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
                                <div className="p-3">
                                    Shows how many triggers broke the desired
                                    conditions (bad behavior)
                                </div>
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
                                <div className="p-3">
                                    Shows how often the triggers conflict with
                                    each other
                                </div>
                                <HealthinessProgress
                                    higherIsBetter={false}
                                    value={healthiness.conflictRation}
                                />
                            </AccordionContent>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </div>
    );
};
