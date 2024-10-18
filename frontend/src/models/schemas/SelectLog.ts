import { z } from 'zod';

export const SelectLogSchema = z.object({
    name: z.string().min(2),
    activity: z.string(),
    caseId: z.string(),
});

export type SelectLogType = z.infer<typeof SelectLogSchema>;
