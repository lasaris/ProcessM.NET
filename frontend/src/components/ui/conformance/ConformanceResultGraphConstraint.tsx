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
import Graphviz from 'graphviz-react';
import { UndoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '../use-toast';

type ConformanceResultGraphConstraintProps = {
    templateEvaluation: TemplateEvaluation[];
    trace: Event[];
};

const formSchema = z.object({
    templateSelect: z.string(),
    constraintSelect: z.string(),
});

export const ConformanceResultGraphConstraint: React.FC<
    ConformanceResultGraphConstraintProps
> = ({ templateEvaluation, trace }) => {
    const { toast } = useToast();
    const [dot, setDot] = useState<string | undefined>(undefined);
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
            <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                {!dot && (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-2 w-full"
                    >
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
                    </form>
                )}
                {dot && (
                    <div className="w-full h-[60vh] overflow-y-hidden">
                        <UndoIcon onClick={() => setDot(undefined)} />
                        <Graphviz
                            dot={dot}
                            options={{
                                zoom: true,
                                width: '100%',
                                useWorker: false,
                            }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
