import { Event } from './API/Event';

export type Healthiness = {
    activationSparsity: number;
    fulfillmentRation: number;
    violationRation: number;
    conflictRation: number;
};

export type ConstraintEvaluation = {
    readableName?: string;
    activityAName?: string;
    activityBName?: string;
};

export type TemplateEvaluation = {
    readableName?: string;
    constraintEvaluations: ConstraintEvaluation[];
};

export type ConformanceExtremeHealthiness = {
    title: string;
    healthiness: Healthiness;
};

export type TraceEvaluation = {
    overallTraceHealthiness: Healthiness;
    mostViolatingTemplate: ConformanceExtremeHealthiness;
    mostConflictingTemplate: ConformanceExtremeHealthiness;
    mostViolatingConstraint: ConformanceExtremeHealthiness;
    mostConflictingConstraint: ConformanceExtremeHealthiness;
    trace: Event[];
    templateEvaluations: TemplateEvaluation[];
};
