import { DiscoverConfiguration } from '@/store/useDiscoverStore';
import { ImportedEventLog } from './ImportedEventLog';

export type DiscoverLog = {
    importedEventLog: ImportedEventLog;
    parametrizedTemplates: DiscoverConfiguration[];
};
