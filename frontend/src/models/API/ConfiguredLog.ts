import { ImportedEventLog } from './ImportedEventLog';

export type Metadata = {
    name: string;
    modified: number;
    size: number;
};

export type ConfiguredLog = {
    importedLog: ImportedEventLog;
    metadata: Metadata;
};
