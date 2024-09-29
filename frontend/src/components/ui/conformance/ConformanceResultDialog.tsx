import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useConformance } from '@/hooks/apiHooks/useConformance';
import { Event } from '@/models/API/Event';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../dialog';
import { H4 } from '../typography/H4';
import { ConformanceResultGraphConstraint } from './ConformanceResultGraphConstraint';
import { ConformanceResultHealthinessAccordion } from './ConformanceResultHealthinessAccordion';

type ConformanceResultDialogProps = {
    events: Event[];
};

export const ConformanceResultDialog: React.FC<
    ConformanceResultDialogProps
> = ({ events }) => {
    const { checkConformance, traceEvaluation } = useConformance();

    let content = <LoadingSpinner />;

    if (traceEvaluation) {
        console.log(traceEvaluation);

        content = (
            <Carousel className="w-full max-w-xs lg:max-w-sm">
                <CarouselContent className="m-4">
                    <CarouselItem>
                        <div>
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <ConformanceResultHealthinessAccordion
                                        title="Overall Trace Healthiness"
                                        healthiness={
                                            traceEvaluation.overallTraceHealthiness
                                        }
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    {[
                        {
                            extreme: traceEvaluation.mostConflictingTemplate,
                            title: 'Most Conflicting Template',
                            type: 'Template',
                        },
                        {
                            extreme: traceEvaluation.mostViolatingTemplate,
                            title: 'Most Violating Template',
                            type: 'Template',
                        },
                        {
                            extreme: traceEvaluation.mostConflictingConstraint,
                            title: 'Most Conflicting Constraint',
                            type: 'Constraint',
                        },
                        {
                            extreme: traceEvaluation.mostViolatingConstraint,
                            title: 'Most Violating Constraint',
                            type: 'Constraint',
                        },
                    ].map((extreme) => {
                        return (
                            <CarouselItem key={extreme.title}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <ConformanceResultHealthinessAccordion
                                            title={extreme.title}
                                            subtitle={
                                                <div>
                                                    <H4>{extreme.type}: </H4>
                                                    <span>
                                                        {extreme.extreme.title}
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
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CheckIcon
                    onClick={() => {
                        checkConformance(events);
                    }}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Conformance</DialogTitle>
                <DialogDescription>
                    Conformance Evaluation Results
                </DialogDescription>
                <div className="flex justify-center">{content}</div>
            </DialogContent>
        </Dialog>
    );
};
