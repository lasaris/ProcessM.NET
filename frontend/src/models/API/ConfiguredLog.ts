import { AlphaMinerConfigurationType } from '../schemas/AlphaMinerConfiguration';
import { HeuristicMinerConfigurationType } from '../schemas/HeuristicMinerConfiguration';
import { ImportedEventLog } from './ImportedEventLog';

export type Metadata = {
    name: string;
};

export type ConfiguredLog = {
    importedLog: ImportedEventLog;
    metadata: Metadata;
    configuration?:
        | AlphaMinerConfigurationType
        | HeuristicMinerConfigurationType;
};
