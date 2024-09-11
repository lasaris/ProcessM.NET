export type Constraint = {
    templateType: number;
    poe: number; // Percentage of events
    poi: number; // Percentage of instances
    checkVacuously: boolean;
    templateInstances: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    templateDescription: any;
};

export type JsonModel = {
    name: string;
    nodes: JsonModel[];
};

export type DiscoveredModel = {
    treeModel: JsonModel;
    declareModel: {
        constraints: Constraint[];
        log: any[];
        name: string;
    };
};
