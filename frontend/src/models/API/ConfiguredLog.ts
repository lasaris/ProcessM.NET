import { ImportedEventLog } from './ImportedEventLog';

export type MineConfiguration = {
    sourcePetriNet: boolean;
    ignoreFrequency: boolean;
};

export type Metadata = {
    name: string;
    modified: number;
    size: number;
};

export type ConfiguredLog = {
    importedLog: ImportedEventLog;
    metadata: Metadata;
    configuration?: MineConfiguration;
};
