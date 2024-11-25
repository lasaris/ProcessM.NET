import { Button } from '@/components/ui/ShadCN/button';
import { Form, FormField, FormMessage } from '@/components/ui/ShadCN/form';
import { Input } from '@/components/ui/ShadCN/input';
import { Label } from '@/components/ui/ShadCN/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Switch } from './ShadCN/switch';

type FileInputFormType = {
    file: File | undefined;
    setCsvSeparatorManually: boolean;
    csvSeparator?: string;
};

const fileInputSchema = z.object({
    file: z.instanceof(File),
    setCsvSeparatorManually: z.boolean(),
    csvSeparator: z.string().optional(),
});

type UploadLogFileProps = {
    uploadLog: UseMutateFunction<
        AxiosResponse<any, any>,
        Error,
        FormData,
        unknown
    >;
};

export const UploadLogFile: React.FC<UploadLogFileProps> = ({ uploadLog }) => {
    const fileForm = useForm<FileInputFormType>({
        resolver: zodResolver(fileInputSchema),
        defaultValues: {
            file: undefined,
            setCsvSeparatorManually: false,
            csvSeparator: undefined,
        },
    });

    const setCsvSeparatorManuallyWatch = fileForm.watch(
        'setCsvSeparatorManually'
    );

    const onSubmitFileForm = ({
        file,
        setCsvSeparatorManually,
        csvSeparator,
    }: FileInputFormType) => {
        if (
            setCsvSeparatorManually &&
            (!csvSeparator || csvSeparator.length === 0)
        ) {
            fileForm.setError('csvSeparator', {
                type: 'custom',
                message: 'Please, enter the CSV separator',
            });

            return;
        }

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            if (csvSeparator) {
                formData.append('csvSeparator', csvSeparator);
            }

            uploadLog(formData);
        }
    };

    return (
        <Form {...fileForm}>
            <form onSubmit={fileForm.handleSubmit(onSubmitFileForm)}>
                <div className="flex flex-col py-4 gap-4">
                    <FormField
                        control={fileForm.control}
                        name="file"
                        render={({ field }) => {
                            return (
                                <div className="flex flex-col gap-2 justify-center w-full">
                                    <Label htmlFor="file" className="w-1/6">
                                        Log
                                    </Label>

                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]; // Extract the first file
                                            field.onChange(file); // Pass the file to React Hook Form
                                        }}
                                    />
                                    <FormMessage />
                                </div>
                            );
                        }}
                    />
                    <FormField
                        control={fileForm.control}
                        name="setCsvSeparatorManually"
                        render={({ field }) => {
                            return (
                                <div className="flex flex-col gap-2 justify-center w-full">
                                    <Label htmlFor="setCsvSeparatorSwitch">
                                        Set CSV Separator Manually
                                    </Label>
                                    <Switch
                                        id="setCsvSeparatorSwitch"
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            return field.onChange(checked);
                                        }}
                                    />
                                </div>
                            );
                        }}
                    />
                    {setCsvSeparatorManuallyWatch && (
                        <FormField
                            control={fileForm.control}
                            name="csvSeparator"
                            render={({ field }) => {
                                return (
                                    <div>
                                        <Input
                                            id="csvSeparator"
                                            onChange={field.onChange}
                                            placeholder="CSV Separator"
                                        />
                                        <FormMessage />
                                    </div>
                                );
                            }}
                        />
                    )}
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
