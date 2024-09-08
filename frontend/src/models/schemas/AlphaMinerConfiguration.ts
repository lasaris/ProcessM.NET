import { z } from 'zod';

export const AlphaMinerConfigurationSchema = z.object({
    ignoreFrequency: z.boolean(),
    sourcePetriNet: z.boolean(),
    invisibleTraces: z.array(z.array(z.string())),
    invisibleActivities: z.array(z.string()),
});

export type AlphaMinerConfigurationType = z.infer<
    typeof AlphaMinerConfigurationSchema
>;
