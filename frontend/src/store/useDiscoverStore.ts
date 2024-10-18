import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { create } from 'zustand';

export interface DiscoverConfiguration {
    template: string;
    poi: number;
    poe: number;
    checkVacuously: boolean;
}

export interface DiscoverConfigurationState {
    importedEventLog: ImportedEventLog | undefined;
    setImportedEventLog: (importedEventLog: ImportedEventLog) => void;
    configurations: DiscoverConfiguration[];
    addConfiguration: (configuration: DiscoverConfiguration) => void;
    clearConfigurations: () => void;
    setConfigurations: (configurations: DiscoverConfiguration[]) => void;
    editCheckVacuously: (
        configurationName: string,
        value: boolean | string
    ) => void;
    editInstances: (configurationName: string, value: number) => void;
    editEvents: (configurationName: string, value: number) => void;
}

export const useDiscoverStore = create<DiscoverConfigurationState>()((set) => ({
    importedEventLog: undefined,
    setImportedEventLog: (importedEventLog: ImportedEventLog) =>
        set(() => ({
            importedEventLog: importedEventLog,
        })),
    configurations: [],
    addConfiguration: (configuration: DiscoverConfiguration) =>
        set((state) => ({
            configurations: [...state.configurations, configuration],
        })),
    clearConfigurations: () => set({ configurations: [] }),
    setConfigurations: (configurations: DiscoverConfiguration[]) =>
        set(() => ({
            configurations,
        })),
    editCheckVacuously: (configName, value) =>
        set((state) => ({
            configurations: state.configurations.map((configuration) => {
                if (
                    configuration.template === configName &&
                    typeof value === 'boolean'
                ) {
                    configuration.checkVacuously = value;
                }

                return configuration;
            }),
        })),
    editEvents: (configName: string, value: number) =>
        set((state) => ({
            configurations: state.configurations.map((configuration) => {
                if (configuration.template === configName) {
                    configuration.poe = value;
                }

                return configuration;
            }),
        })),
    editInstances: (configName: string, value: number) =>
        set((state) => ({
            configurations: state.configurations.map((configuration) => {
                if (configuration.template === configName) {
                    configuration.poi = value;
                }

                return configuration;
            }),
        })),
}));
