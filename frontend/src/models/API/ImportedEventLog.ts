export type ImportedEventLog = {
    activity: number;
    caseId: number;
    headers: string[];
    rows: Array<string>[];
    timestamp: string | null;
    timestampFormat: string | null;
};
