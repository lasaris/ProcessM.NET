import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { JsonModel } from '@/models/JsonModel';
import React from 'react';

type DeclareModelProps = {
    model: JsonModel;
    className: string;
};

export const DeclareModel: React.FC<DeclareModelProps> = ({
    model,
    className,
}) => {
    return (
        <Accordion type="single" collapsible className={`${className}`}>
            <AccordionItem value="item-1">
                <AccordionTrigger>{model.Name}</AccordionTrigger>
                <AccordionContent>
                    {model.Constraints.map((constraint) => {
                        return (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full px-10"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        {constraint.TemplateType}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {constraint.TemplateInstances.map(
                                            (instance) => {
                                                return (
                                                    <div>
                                                        <div>
                                                            {instance.LogEventA}
                                                        </div>
                                                        <div>
                                                            {instance.LogEventB}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
