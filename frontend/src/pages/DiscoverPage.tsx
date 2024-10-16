import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MultiSelect } from '@/components/ui/MultiSelect';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/ShadCN/accordion';
import { Button } from '@/components/ui/ShadCN/button';
import { useToast } from '@/components/ui/use-toast';
import { stripParentheses } from '@/helpers/stripParentheses';
import { useDiscoverTemplates } from '@/hooks/apiHooks/useDiscoverTemplates';
import { DeclareConstraint } from '@/models/DeclareConstraints';
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
    const { entityName } = useParams();
    const { data, isError, isLoading } = useDiscoverTemplates();
    const { toast } = useToast();

    const continueWithSelected = () => {
        if (entityName && configurations.length > 0) {
            navigate(
                TargetURL.DISCOVER_CONFIGURE_CONSTRAINTS.replace(
                    ':entityName',
                    entityName
                )
            );
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        toast({
            title: 'Unable to load templates',
            variant: 'destructive',
        });
        return <div>Unable to load constraints!</div>;
    }

    const templates: DeclareConstraint[] = data?.data.map((template: any) => {
        return {
            template: template.titName,
            name: template.description.readableName,
            description: template.description.description,
            ltlExpression: template.description.ltlExpression,
            type: template.description.type,
        };
    });

    const items = templates.map((constraint) => {
        return (
            <AccordionItem
                key={constraint.template}
                value={constraint.template}
                className="border border-gray-200 rounded-lg shadow-sm mb-4"
            >
                <AccordionTrigger className="w-full text-left px-4 py-3 font-semibold shadow-md rounded-t-lg">
                    {constraint.template}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 p-4 rounded-b-lg">
                    <div>
                        <span className="font-semibold pr-2">Type:</span>
                        {constraint.type}
                    </div>
                    <div>
                        <span className="font-semibold pr-2">Description:</span>
                        {constraint.description}
                    </div>
                    <div>
                        <span className="font-semibold pr-2">
                            LTL Expression:
                        </span>
                        <code className="bg-gray-100 rounded p-1">
                            {constraint.ltlExpression}
                        </code>
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    });

    const options = templates.map((constraint) => {
        return {
            label: constraint.template,
            value: constraint.template,
        };
    });

    return (
        <div className="h-full w-full flex flex-col pt-6 gap-4 items-center justify-between">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Select Constraints for Process Discovery
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    DECLARE constraints in declarative process mining define
                    flexible rules or conditions that must be followed by
                    activities in a process, without enforcing a strict
                    sequence. These constraints specify patterns such as the
                    required order, mutual exclusion, or coexistence of
                    activities, allowing for greater variability in how
                    processes are executed.
                </p>
            </div>
            <div className="h-full w-full flex flex-col gap-4 items-center">
                <MultiSelect
                    className="w-5/6 md:w-3/4 bg-white border border-gray-300 rounded-lg shadow-sm p-3"
                    options={options}
                    defaultValue={configurations.map(
                        (configuration) => configuration.template
                    )}
                    onValueChange={(constraints) => {
                        const discoverConfigs: DiscoverConfiguration[] =
                            constraints.map((constraint) => {
                                const realConstraint = templates.find(
                                    (c) => c.template === constraint
                                );

                                return {
                                    template: stripParentheses(
                                        realConstraint!.template
                                    ),
                                    checkVacuously: true,
                                    poe: 100,
                                    poi: 100,
                                };
                            });

                        setConfigurations(discoverConfigs);
                    }}
                    maxCount={8}
                />

                <Accordion
                    className="w-5/6 md:w-3/4 bg-white border border-gray-300 rounded-lg shadow-md max-h-[50vh] overflow-auto p-4"
                    type="single"
                    collapsible
                >
                    {items}
                </Accordion>
            </div>

            <div className="sticky bottom-4 flex justify-end w-full px-4">
                {configurations.length > 0 && (
                    <Button
                        onClick={continueWithSelected}
                        className="px-6 py-2  rounded-lg shadow "
                    >
                        Continue!
                    </Button>
                )}
            </div>
        </div>
    );
};
