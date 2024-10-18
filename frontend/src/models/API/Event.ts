export type Event = {
    activity: string;
    activityInTraceId: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    caseId: string;
    timestamp: string;
    resources: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
};
