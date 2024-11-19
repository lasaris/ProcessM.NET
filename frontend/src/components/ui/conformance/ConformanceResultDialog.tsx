import { Card, CardContent } from '@/components/ui/ShadCN/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/ShadCN/carousel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { createDotFromTraceWithHighlight } from '@/helpers/createDotFromTraceWithHighlight';
import { useConformance } from '@/hooks/apiHooks/useConformance';
import { useModelsDb } from '@/hooks/useModelsDb';
import { Event } from '@/models/API/Event';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import Graphviz from 'graphviz-react';
import { CheckIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner';
import { H4 } from '../typography/H4';
import { ConformanceResultGraphConstraint } from './ConformanceResultGraphConstraint';
import { ConformanceResultHealthinessAccordion } from './ConformanceResultHealthinessAccordion';

type ConformanceResultDialogProps = {
    events: Event[];
};

export const ConformanceResultDialog: React.FC<
    ConformanceResultDialogProps
> = ({ events }) => {
    const { checkConformance, traceEvaluation, isError } = useConformance();
    const [dot, setDot] = useState<string | undefined>(undefined);
    const { entityName } = useParams();
    const { fetchSingleModel } = useModelsDb();
    const model = useAsync(() => fetchSingleModel(entityName || ''), []);

    let content = <LoadingSpinner />;

    useEffect(() => {
        if (traceEvaluation?.trace) {
            setDot(
                createDotFromTraceWithHighlight(
                    traceEvaluation?.trace || [],
                    []
                )
            );
        }
    }, [traceEvaluation]);

    if (isError) {
        content = (
            <div>
                Unable to perform conformance check with the selected trace on
                the current model.
            </div>
        );
    }

    if (traceEvaluation) {
        content = (
            <Carousel className="w-full max-w-xs lg:max-w-xs">
                <CarouselContent className="m-4">
                    <CarouselItem>
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <div>
                                    <ConformanceResultHealthinessAccordion
                                        title="Overall Trace Healthiness"
                                        description={
                                            <p>
                                                Below attributes show, how
                                                compliant the trace is with the
                                                mined model.
                                            </p>
                                        }
                                        healthiness={
                                            traceEvaluation.overallTraceHealthiness
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    {[
                        {
                            extreme: traceEvaluation.mostConflictingTemplate,
                            title: 'Most Conflicting Template',
                            description: (
                                <p>
                                    Template, where the most significant number
                                    of{' '}
                                    <TooltipWrapper
                                        side="bottom"
                                        tooltipContent="It’s unclear if the template is fulfilled or violated when activated by the trace."
                                    >
                                        <span className="font-bold px-1 inline-block transition-transform ease-in-out transform hover:scale-110">
                                            conflicts
                                        </span>
                                    </TooltipWrapper>
                                    occurred.
                                </p>
                            ),
                            type: 'Template',
                        },
                        {
                            extreme: traceEvaluation.mostViolatingTemplate,
                            title: 'Most Violating Template',
                            description: (
                                <p>
                                    Template, where the most significant number
                                    of{' '}
                                    <TooltipWrapper
                                        side="bottom"
                                        tooltipContent="The template isn't fullfilled when activated by the trace."
                                    >
                                        <span className="font-bold px-1 inline-block transition-transform ease-in-out transform hover:scale-110">
                                            violations
                                        </span>
                                    </TooltipWrapper>
                                    occurred.
                                </p>
                            ),
                            type: 'Template',
                        },
                        {
                            extreme: traceEvaluation.mostConflictingConstraint,
                            title: 'Most Conflicting Constraint',
                            description: (
                                <p>
                                    Constraint, where the most significant
                                    number of{' '}
                                    <TooltipWrapper
                                        side="bottom"
                                        tooltipContent="It’s unclear if the constraint is fulfilled or violated."
                                    >
                                        <span className="font-bold px-1 inline-block transition-transform ease-in-out transform hover:scale-110">
                                            conflicts
                                        </span>
                                    </TooltipWrapper>
                                    occurred.
                                </p>
                            ),
                            type: 'Constraint',
                        },
                        {
                            extreme: traceEvaluation.mostViolatingConstraint,
                            title: 'Most Violating Constraint',
                            description: (
                                <p>
                                    Constraint, where the most significant
                                    number of{' '}
                                    <TooltipWrapper
                                        side="bottom"
                                        tooltipContent="The constraint isn't fullfilled"
                                    >
                                        <span className="font-bold px-1 inline-block transition-transform ease-in-out transform hover:scale-110">
                                            violations
                                        </span>
                                    </TooltipWrapper>
                                    occurred.
                                </p>
                            ),
                            type: 'Constraint',
                        },
                    ]
                        .filter(
                            (extreme) => extreme.extreme.healthiness !== null
                        )
                        .map((extreme) => {
                            return (
                                <CarouselItem key={extreme.title}>
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <ConformanceResultHealthinessAccordion
                                                title={extreme.title}
                                                description={
                                                    extreme.description
                                                }
                                                subtitle={
                                                    <div>
                                                        <H4>
                                                            {extreme.type}:{' '}
                                                        </H4>
                                                        <span>
                                                            {
                                                                extreme.extreme
                                                                    .title
                                                            }
                                                        </span>
                                                    </div>
                                                }
                                                healthiness={
                                                    extreme.extreme.healthiness
                                                }
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            );
                        })}
                    <CarouselItem>
                        <ConformanceResultGraphConstraint
                            templateEvaluation={
                                traceEvaluation.templateEvaluations
                            }
                            trace={traceEvaluation.trace}
                            setDot={setDot}
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        );
    }

    return (
        <Dialog onOpenChange={() => checkConformance(events)}>
            <DialogTrigger asChild>
                <CheckIcon />
            </DialogTrigger>
            <DialogContent className="max-w-[100vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw]">
                <DialogTitle>Conformance</DialogTitle>
                <DialogDescription>
                    Conformance Evaluation Results
                </DialogDescription>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        {content}
                    </div>
                    {dot && (
                        <div className="w-full hidden md:w-1/6 md:block">
                            <Graphviz
                                dot={dot}
                                className="shadow-xl w-full"
                                options={{
                                    zoom: true,
                                    width: '100%',
                                    useWorker: false,
                                }}
                            />
                        </div>
                    )}
                    {model.result?.model && (
                        <div className="w-full hidden md:w-1/3 md:block">
                            <Graphviz
                                dot={model.result.model}
                                className="shadow-xl w-full"
                                options={{
                                    zoom: true,
                                    width: '100%',
                                    useWorker: false,
                                }}
                            />
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
