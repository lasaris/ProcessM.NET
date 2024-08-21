import { create } from 'zustand';

export interface DiscoverConfiguration {
    constraintName: string;
    percentageOfInstances: number;
    percentageOfEvents: number;
    checkVacuously: boolean;
}

export interface DiscoverConfigurationState {
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
                    configuration.constraintName === configName &&
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
                if (configuration.constraintName === configName) {
                    configuration.percentageOfEvents = value;
                }

                return configuration;
            }),
        })),
    editInstances: (configName: string, value: number) =>
        set((state) => ({
            configurations: state.configurations.map((configuration) => {
                if (configuration.constraintName === configName) {
                    configuration.percentageOfInstances = value;
                }

                return configuration;
            }),
        })),
}));
