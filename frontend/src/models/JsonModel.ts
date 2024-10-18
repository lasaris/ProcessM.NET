export type Constraint = {
    templateType: number;
    poe: number; // Percentage of events
    poi: number; // Percentage of instances
    checkVacuously: boolean;
    templateInstances: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    templateDescription: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type JsonModel = {
    name: string;
    nodes: JsonModel[];
};

export type DiscoveredModel = {
    dotGraph: string;
    declareModel: {
        constraints: Constraint[];
        log: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
        name: string;
    };
};
