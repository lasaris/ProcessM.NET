import { z } from 'zod';

export const SelectCaseIdActivityFormSchema = z.object({
    caseId: z.string(),
    activity: z.string(),
});

export type SelectCaseIdActivityFormSchemaType = z.infer<
    typeof SelectCaseIdActivityFormSchema
>;
