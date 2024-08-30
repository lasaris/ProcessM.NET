export type ImportedEventLog = {
    activity: number;
    caseId: number;
    headers: string[];
    rows: Array<string>[];
    timestamp: number | null;
    timestampFormat: string | null;
};
