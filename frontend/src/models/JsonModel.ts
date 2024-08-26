export type Constraint = {
    TemplateType: number;
    Poe: number; // Percentage of events
    Poi: number; // Percentage of instances
    CheckVacuously: boolean;
    TemplateInstances: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type JsonModel = {
    Name: string;
    Constraints: Constraint[];
};
