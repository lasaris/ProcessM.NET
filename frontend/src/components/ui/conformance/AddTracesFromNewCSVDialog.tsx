import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import { useGetTracesFromImportedEventLog } from '@/hooks/apiHooks/useGetTracesFromImportedEventLog';
import { useLogs } from '@/hooks/apiHooks/useLogs';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { TraceDTO } from '@/models/API/TraceDTO';
import {
    FileInputFormSchema,
    FileInputFormSchemaType,
} from '@/models/schemas/FileInputFormType';
import {
    SelectCaseIdActivityFormSchema,
    SelectCaseIdActivityFormSchemaType,
} from '@/models/schemas/SelectCaseIdActivityForm';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoadingSpinner } from '../LoadingSpinner';
import { Button } from '../ShadCN/button';
import { Form, FormField, FormMessage } from '../ShadCN/form';
import { Input } from '../ShadCN/input';
import { Label } from '../ShadCN/label';
import { useToast } from '../use-toast';

type AddTracesFromNewCSVDialogProps = {
    onSuccess: (traces: TraceDTO[]) => void;
    open: boolean;
    setOpen: (newState: boolean) => void;
    closeDialog: () => void;
};

export const AddTracesFromNewCSVDialog: React.FC<
    AddTracesFromNewCSVDialogProps
> = ({ onSuccess, open, setOpen, closeDialog }) => {
    const {
        uploadLog,
        data: importedEventLogData,
        isPending,
        isSuccess: successfullyUploadedLog,
        reset,
    } = useLogs();

    const onSuccessAndCloseDialog = (traces: TraceDTO[]) => {
        onSuccess(traces);
        closeDialog();
    };

    const { getTraces, reset: resetImportTraces } =
        useGetTracesFromImportedEventLog(onSuccessAndCloseDialog);

    const { toast } = useToast();
    const fileForm = useForm<FileInputFormSchemaType>({
        defaultValues: {
            file: undefined,
            csvSeparator: '',
        },
        resolver: zodResolver(FileInputFormSchema),
    });

    const configureForm = useForm<SelectCaseIdActivityFormSchemaType>({
        defaultValues: {
            activity: '',
            caseId: '',
        },
        resolver: zodResolver(SelectCaseIdActivityFormSchema),
    });

    const uploadFileHandler = (values: FileInputFormSchemaType) => {
        const file = values.file;

        if (!file) {
            toast({
                title: 'File not found',
                variant: 'destructive',
            });

            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('csvSeparator', values.csvSeparator);

        uploadLog(formData);
    };

    const configureImportedEventLog = (
        values: SelectCaseIdActivityFormSchemaType
    ) => {
        if (!importedEventLogData) {
            toast({
                title: 'Something went wrong!',
                description: 'Unable to find the imported event log!',
                variant: 'destructive',
            });
            return;
        }

        const importedEventLog = importedEventLogData.data as ImportedEventLog;

        const caseIdIndex = importedEventLog.headers.findIndex(
            (header) => header === values.caseId
        );
        const activityIndex = importedEventLog.headers.findIndex(
            (header) => header === values.activity
        );

        if (caseIdIndex === -1 || activityIndex === -1) {
            toast({
                title: 'Something went wrong!',
                description: 'Unable to find the activity or case id header',
                variant: 'destructive',
            });
            return;
        }

        importedEventLog.caseId = caseIdIndex;
        importedEventLog.activity = activityIndex;

        getTraces(importedEventLog);
    };

    let content: React.ReactNode;

    if (isPending) {
        content = <LoadingSpinner />;
    } else if (!importedEventLogData) {
        content = (
            <Form {...fileForm}>
                <form
                    onSubmit={fileForm.handleSubmit(uploadFileHandler)}
                    className="flex flex-col w-full gap-3"
                >
                    <FormField
                        control={fileForm.control}
                        name="file"
                        render={({ field }) => {
                            return (
                                <div>
                                    <Label htmlFor="file">CSV Log</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(file);
                                        }}
                                    />
                                    <FormMessage />
                                </div>
                            );
                        }}
                    />
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
                    <Button type="submit">Load</Button>
                </form>
            </Form>
        );
    } else if (successfullyUploadedLog && importedEventLogData) {
        const importedEventLog = importedEventLogData.data as ImportedEventLog;

        content = (
            <Form {...configureForm}>
                <form
                    onSubmit={configureForm.handleSubmit(
                        configureImportedEventLog
                    )}
                    className="flex flex-col w-full gap-3"
                >
                    <FormField
                        control={configureForm.control}
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
                                        <SelectContent>
                                            {selectItems}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        }}
                    />
                    <FormField
                        control={configureForm.control}
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
                                        <SelectContent>
                                            {selectItems}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        }}
                    />
                    <Button type="submit" className="w-1/3">
                        Import Traces
                    </Button>
                </form>
            </Form>
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                reset();
                resetImportTraces();
                setOpen(!open);
            }}
        >
            <DialogTrigger asChild>
                <Button>Import Traces From New CSV File</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Import Traces From New CSV</DialogTitle>
                <DialogDescription>
                    Upload a file, from which you want to import new traces.
                </DialogDescription>
                <div className="flex justify-center">{content}</div>
            </DialogContent>
        </Dialog>
    );
};
