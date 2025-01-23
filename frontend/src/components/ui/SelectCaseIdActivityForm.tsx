import { Form, FormField } from '@/components/ui/ShadCN/form';
import { Label } from '@/components/ui/ShadCN/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import {
    SelectCaseIdActivityFormSchema,
    SelectCaseIdActivityFormSchemaType,
} from '@/models/schemas/SelectCaseIdActivityForm';
import { useDiscoverStore } from '@/store/useDiscoverStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ShadCN/button';
import { useToast } from './use-toast';

type SelectCaseIdActivityFormProps = {
    importedEventLog: ImportedEventLog;
    handleSubmit: () => void;
};

export const SelectCaseIdActivityForm: React.FC<
    SelectCaseIdActivityFormProps
> = ({ importedEventLog, handleSubmit }) => {
    const { setImportedEventLog } = useDiscoverStore();
    const form = useForm<SelectCaseIdActivityFormSchemaType>({
        defaultValues: {
            caseId: '',
            activity: '',
        },
        resolver: zodResolver(SelectCaseIdActivityFormSchema),
    });
    const { toast } = useToast();

    const submitCaseIdActivityHandler = (
        values: SelectCaseIdActivityFormSchemaType
    ) => {
        if (values.activity === '' || values.caseId === '') {
            toast({
                title: 'You need to select Case ID and Activity column',
                variant: 'destructive',
            });
            return;
        }
        const activityHeaderIndex = importedEventLog.headers.findIndex(
            (header) => header === values.activity
        );
        const caseIdHeaderIndex = importedEventLog.headers.findIndex(
            (header) => header === values.caseId
        );

        if (activityHeaderIndex === -1 || caseIdHeaderIndex === -1) {
            toast({
                title: 'Something went wrong',
                variant: 'destructive',
            });
            return;
        }

        importedEventLog.activity = activityHeaderIndex;
        importedEventLog.caseId = caseIdHeaderIndex;

        setImportedEventLog(importedEventLog);
        handleSubmit();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitCaseIdActivityHandler)}
                className="flex flex-col w-full items-end max-w-xl gap-6 bg-white p-8 rounded-lg shadow-md"
            >
                <div className="w-full mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Event Log Configuration
                    </h2>
                    <p className="text-sm text-gray-600">
                        Please select the appropriate Case ID and Activity from
                        the event log that is being analyzed.
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="caseId"
                    render={({ field }) => {
                        const selectItems = importedEventLog.headers
                            .filter((header) => header !== '')
                            .map((header, index) => (
                                <SelectItem key={index} value={header}>
                                    {header}
                                </SelectItem>
                            ));

                        return (
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-sm font-semibold text-gray-700">
                                    Select CaseID
                                </Label>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className="border border-gray-300 rounded-md shadow-sm">
                                        <SelectValue placeholder="Case ID" />
                                    </SelectTrigger>
                                    <SelectContent>{selectItems}</SelectContent>
                                </Select>
                            </div>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="activity"
                    render={({ field }) => {
                        const selectItems = importedEventLog.headers
                            .filter((header) => header !== '')
                            .map((header, index) => (
                                <SelectItem key={index} value={header}>
                                    {header}
                                </SelectItem>
                            ));

                        return (
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-sm font-semibold text-gray-700">
                                    Select Activity
                                </Label>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className="border border-gray-300 rounded-md shadow-sm">
                                        <SelectValue placeholder="Activity" />
                                    </SelectTrigger>
                                    <SelectContent>{selectItems}</SelectContent>
                                </Select>
                            </div>
                        );
                    }}
                />
                <Button type="submit" className="w-1/3">
                    Confirm
                </Button>
            </form>
        </Form>
    );
};
