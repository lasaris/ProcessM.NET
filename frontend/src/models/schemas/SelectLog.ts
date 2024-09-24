import { z } from 'zod';

export const SelectLogSchema = z.object({
    name: z.string().min(2),
});

export type SelectLogType = z.infer<typeof SelectLogSchema>;
