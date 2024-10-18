import { ImportedEventLog } from './ImportedEventLog';

export type IELWithTimestamp = {
    importedLog: ImportedEventLog;
    timestampFormat: string;
};
