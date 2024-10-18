import { z } from 'zod';

export const FileInputFormSchema = z.object({
    file: z.instanceof(File),
    csvSeparator: z.string().min(1),
});

export type FileInputFormSchemaType = z.infer<typeof FileInputFormSchema>;
