import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MultiSelect } from '@/components/ui/MultiSelect';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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
            >
                <AccordionTrigger>{constraint.template}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    <div>
                        <span className="font-bold pr-3">Type:</span>
                        {constraint.type}
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

    const options = templates.map((constraint) => {
        return {
            label: constraint.template,
            value: constraint.template,
        };
    });

    return (
        <div className="h-full w-full flex flex-col pt-6 gap-4 items-center justify-center">
            <MultiSelect
                className="w-3/4"
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
