import { Button } from '@/components/ui/ShadCN/button';
import { Card, CardContent } from '@/components/ui/ShadCN/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import { createDotFromTraceWithHighlight } from '@/helpers/createDotFromTraceWithHighlight';
import { Event } from '@/models/API/Event';
import { TemplateEvaluation } from '@/models/TraceEvaluation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Lead } from '../typography/Lead';
import { useToast } from '../use-toast';

type ConformanceResultGraphConstraintProps = {
    templateEvaluation: TemplateEvaluation[];
    trace: Event[];
    setDot: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const formSchema = z.object({
    templateSelect: z.string(),
    constraintSelect: z.string(),
});

export const ConformanceResultGraphConstraint: React.FC<
    ConformanceResultGraphConstraintProps
> = ({ templateEvaluation, trace, setDot }) => {
    const { toast } = useToast();
    const { control, watch, handleSubmit } = useForm<
        z.infer<typeof formSchema>
    >({
        resolver: zodResolver(formSchema),
        defaultValues: {
            templateSelect: '',
            constraintSelect: '',
        },
    });

    const templateSelect = watch('templateSelect');

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const template = templateEvaluation.find((templateEval) => {
            return templateEval.readableName === data.templateSelect;
        });

        if (!template) {
            toast({
                title: `Something went wrong`,
                variant: 'destructive',
            });
            return;
        }

        const constraint = template.constraintEvaluations.find(
            (constraintEval) => {
                return constraintEval.readableName === data.constraintSelect;
            }
        );

        if (!constraint) {
            toast({
                title: `Something went wrong`,
                variant: 'destructive',
            });
            return;
        }

        const logEvents = [];
        if (constraint.activityAName) {
            logEvents.push(constraint.activityAName);
        }
        if (constraint.activityBName) {
            logEvents.push(constraint.activityBName);
        }

        const dot = createDotFromTraceWithHighlight(trace, logEvents);
        setDot(dot);
    };

    return (
        <Card>
            <CardContent className="flex flex-col gap-4 aspect-square items-center p-6">
                <Lead className="underline w-full">
                    View constraint in trace
                </Lead>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-full"
                >
                    <p>
                        Select a mined template and a constraint to view it in
                        the trace.
                    </p>
                    <Controller
                        name="templateSelect"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a Template" />
                                </SelectTrigger>
                                <SelectContent>
                                    {templateEvaluation.map(
                                        (templateEvaluation) => {
                                            const name =
                                                templateEvaluation.readableName;

                                            if (name) {
                                                return (
                                                    <SelectItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        {name}
                                                    </SelectItem>
                                                );
                                            }
                                        }
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <Controller
                        name="constraintSelect"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!templateSelect}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a Constraint" />
                                </SelectTrigger>
                                <SelectContent>
                                    {templateSelect &&
                                        templateEvaluation
                                            .find(
                                                (templateEvaluation) =>
                                                    templateEvaluation.readableName ===
                                                    templateSelect
                                            )
                                            ?.constraintEvaluations.map(
                                                (constraintEvaluation) => {
                                                    const name =
                                                        constraintEvaluation.readableName;

                                                    if (name) {
                                                        return (
                                                            <SelectItem
                                                                key={name}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </SelectItem>
                                                        );
                                                    }
                                                }
                                            )}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Button type="submit">View</Button>
                    <Button
                        type="button"
                        onClick={() => {
                            setDot(createDotFromTraceWithHighlight(trace, []));
                        }}
                    >
                        Clear
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
