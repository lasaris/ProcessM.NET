import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { jsonModelExample } from '@/examples/exampleJsonModels/example';
import { safeJsonParse } from '@/helpers/safeJsonParse';
import { JsonModel } from '@/models/JsonModel';
import React from 'react';

export const DiscoverView: React.FC = () => {
    const parsed = safeJsonParse<JsonModel>(jsonModelExample);

    if (parsed) {
        return (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>{parsed.Name}</AccordionTrigger>
                    <AccordionContent>
                        {parsed.Constraints.map((constraint) => {
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
                                                                {
                                                                    instance.LogEventA
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    instance.LogEventB
                                                                }
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
    }

    return <div>Unable to parse the json</div>;
};
