import { z } from 'zod';
import { AlphaMinerConfigurationSchema } from './AlphaMinerConfiguration';

export const HeuristicMinerConfigurationSchema =
    AlphaMinerConfigurationSchema.extend({
        direct: z.number().min(0).max(1),
        loopLengthAA: z.number().min(0).max(1),
        loopLengthABA: z.number().min(0).max(1),
        allTasksConnected: z.boolean(),
        relativeToBest: z.number().min(0).max(1),
        useLongDistance: z.boolean(),
        longDistance: z.number().min(0).max(1),
    });

export type HeuristicMinerConfigurationType = z.infer<
    typeof HeuristicMinerConfigurationSchema
>;
