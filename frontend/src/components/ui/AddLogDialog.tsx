import logsApi from '@/api/logs';
import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { Form, FormField } from '@/components/ui/ShadCN/form';
import { Input } from '@/components/ui/ShadCN/input';
import { Label } from '@/components/ui/ShadCN/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import { STORES } from '@/db/db';
import { useLogs } from '@/hooks/apiHooks/useLogs';
import { useTrySetTimestampFormat } from '@/hooks/apiHooks/useTrySetTimestampFormat';
import { useLogsDb } from '@/hooks/useLogsDb';
import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { IELWithTimestamp } from '@/models/API/IELWithTimestamp';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingSpinner } from './LoadingSpinner';
import { Switch } from './ShadCN/switch';
import { useToast } from './use-toast';

type ConfigurationFormType = {
    logName: string;
    containsTimestamp: boolean;
    timestamp: string | undefined;
};

type FileInputFormType = {
    file: File | undefined;
    csvSeparator: string;
};

type AddLogDialogProps = {
    resetLogs: () => void;
};

export const AddLogDialog: React.FC<AddLogDialogProps> = ({ resetLogs }) => {
    const { toast } = useToast();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const timestampFormatInputRef = useRef<HTMLInputElement>(null);
    const {
        uploadLog,
        data: importedEventLogData,
        reset,
        isPending,
    } = useLogs();

    const { addIntoDb } = useLogsDb();
    const {
        trySetTimestamp,
        timestampFormat,
        reset: resetTimestamp,
        isError: setTimestampFormatError,
        isSuccess: setTimestampFormatIsSuccess,
    } = useTrySetTimestampFormat();

    // First part of dialog - file input
    const fileForm = useForm<FileInputFormType>({
        defaultValues: {
            file: undefined,
            csvSeparator: '',
        },
    });

    // Second form
    const attributesForm = useForm<ConfigurationFormType>({
        defaultValues: {
            containsTimestamp: false,
            logName: '',
        },
    });

    const importedEventLog = importedEventLogData?.data
        ? (importedEventLogData.data as ImportedEventLog)
        : undefined;

    const containsTimestampWatch = attributesForm.watch('containsTimestamp');
    const timestampColumn = attributesForm.watch('timestamp');

    const onSubmitFileForm = (fileInputData: FileInputFormType) => {
        const file = fileInputData.file;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('csvSeparator', fileInputData.csvSeparator);

            uploadLog(formData);
        }
    };

    const onCheckTimestamp = () => {
        if (!containsTimestampWatch || !importedEventLogData) {
            toast({
                title: `Something went wrong!`,
                variant: 'destructive',
            });
            return;
        }

        if (!timestampColumn) {
            toast({
                title: `You have to select timestamp first!`,
                variant: 'default',
            });
            return;
        }

        if (!importedEventLog) {
            toast({
                title: `Invalid Imported Event Log`,
                variant: 'destructive',
            });
            return;
        }

        const timestampIndex = importedEventLog.headers.findIndex(
            (header) => header === timestampColumn
        );

        if (timestampIndex === -1) {
            toast({
                title: `Something went wrong`,
                variant: 'destructive',
            });
            return;
        }

        importedEventLog.timestamp = timestampIndex;

        trySetTimestamp(importedEventLog);
    };

    const checkOnLogSubmitErrors = (
        attributesFormData: ConfigurationFormType
    ) => {
        let errors = [];

        if (!importedEventLog) {
            errors.push('The event log is not imported');
        }

        if (attributesFormData.logName.length < 3) {
            errors.push(
                'The imported event log name must contain more than 3 characters'
            );
        }

        const timestampFormat = timestampFormatInputRef?.current?.value;
        if (
            attributesFormData.containsTimestamp &&
            (!timestampFormat || timestampFormat === '')
        ) {
            errors.push(
                'If the log contains timestamp, please check your timestamp or edit the timestamp format'
            );
        }

        if (errors.length > 0) {
            toast({
                title: 'Error while importing log',
                description: (
                    <>
                        {errors.map((error, index) => {
                            return <div key={index}>- {error}</div>;
                        })}
                    </>
                ),
                variant: 'destructive',
            });
            return false;
        }

        return true;
    };

    const saveLog = (configuredLog: ConfiguredLog) => {
        addIntoDb<ConfiguredLog>(
            configuredLog,
            STORES.Logs,
            configuredLog.metadata.name
        );

        fileForm.reset();
        attributesForm.reset();
        reset();
        setOpenDialog(false);
        resetLogs();
        resetTimestamp();
    };

    const onSubmitAttributesForm = async (
        attributesFormData: ConfigurationFormType
    ) => {
        // Basic checks
        if (!checkOnLogSubmitErrors(attributesFormData)) {
            return;
        }

        // Doesn't contain timestamp, I have all I need and I can save the log
        if (!attributesFormData.containsTimestamp) {
            const configuredLog: ConfiguredLog = {
                metadata: {
                    name: attributesFormData.logName,
                },
                importedLog: importedEventLog!,
            };

            saveLog(configuredLog);
            return;
        }

        // Timestamp Format, that was submitted
        const testTimestampFormat = timestampFormatInputRef.current?.value;

        // If the log contains a timestamp and was checked, then I can set it to the imported log
        if (
            timestampFormat &&
            setTimestampFormatIsSuccess &&
            testTimestampFormat === timestampFormat.data
        ) {
            importedEventLog!.timestampFormat = timestampFormat.data;
        }

        // The user changed the timestamp format or the timestamp format 'api check' didn't successfully recognize the timestamp format
        if (
            setTimestampFormatError ||
            timestampFormat?.data !== testTimestampFormat
        ) {
            try {
                const importedEventLogWithTimestamp: IELWithTimestamp = {
                    importedLog: importedEventLog!,
                    timestampFormat: testTimestampFormat!,
                };

                await logsApi.trySetTimestampFormatManual(
                    importedEventLogWithTimestamp
                );
                importedEventLog!.timestampFormat = testTimestampFormat!;
            } catch (_: any) {
                toast({
                    title: 'Unable to set this timestamp format',
                    variant: 'destructive',
                });
                return;
            }
        }

        const configuredLog: ConfiguredLog = {
            metadata: {
                name: attributesFormData.logName,
            },
            importedLog: importedEventLog!,
        };

        saveLog(configuredLog);
    };

    let content = <></>;

    if (importedEventLogData === undefined) {
        // The file was not yet uploaded
        content = (
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
                                                const file =
                                                    e.target.files?.[0]; // Extract the first file
                                                field.onChange(file); // Pass the file to React Hook Form
                                            }}
                                        />
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
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        );
    } else if (importedEventLogData === undefined && isPending) {
        // The file was uploaded and now I'm waiting for response
        content = <LoadingSpinner />;
    } else if (importedEventLog) {
        content = (
            <Form {...attributesForm}>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={attributesForm.handleSubmit(
                        onSubmitAttributesForm
                    )}
                >
                    <FormField
                        control={attributesForm.control}
                        name="logName"
                        render={({ field }) => {
                            return (
                                <div className="flex flex-col gap-2 justify-center w-full">
                                    <Label htmlFor="file">Log Name</Label>
                                    <Input
                                        id="file"
                                        onChange={field.onChange}
                                    />
                                </div>
                            );
                        }}
                    />
                    <FormField
                        control={attributesForm.control}
                        name="containsTimestamp"
                        render={({ field }) => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="switchContainsTimestamp">
                                        Contains Timestamp
                                    </Label>
                                    <Switch
                                        id="switchContainsTimestamp"
                                        onCheckedChange={(checked) => {
                                            resetTimestamp(); // Custom function call
                                            return field.onChange(checked); // Pass the "checked" value to field.onChange
                                        }}
                                    />
                                </div>
                            );
                        }}
                    />
                    {containsTimestampWatch && (
                        <FormField
                            control={attributesForm.control}
                            name="timestamp"
                            render={({ field }) => {
                                return (
                                    <div className="flex flex-col gap-3">
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Timestamp" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {importedEventLog?.headers.map(
                                                    (header: string) => {
                                                        if (header === '') {
                                                            return;
                                                        }

                                                        return (
                                                            <SelectItem
                                                                key={header}
                                                                value={header}
                                                            >
                                                                {header}
                                                            </SelectItem>
                                                        );
                                                    }
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            className="w-1/3"
                                            type="button"
                                            onClick={onCheckTimestamp}
                                        >
                                            Check Timestamp
                                        </Button>
                                        {setTimestampFormatIsSuccess &&
                                            timestampFormat && (
                                                <div>
                                                    <Label htmlFor="timestampFormatInput">
                                                        Parsed Timestamp Format
                                                    </Label>
                                                    <Input
                                                        id="timestampFormatInput"
                                                        defaultValue={
                                                            timestampFormat.data
                                                        }
                                                        ref={
                                                            timestampFormatInputRef
                                                        }
                                                    />
                                                </div>
                                            )}
                                        {setTimestampFormatError && (
                                            <div>
                                                <Label htmlFor="timestampFormatInput">
                                                    Parsed Timestamp Format
                                                </Label>
                                                <Input
                                                    id="timestampFormatInput"
                                                    ref={
                                                        timestampFormatInputRef
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    )}
                    <Button type="submit">Submit!</Button>
                </form>
            </Form>
        );
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button>Add Log</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Log</DialogTitle>
                    <DialogDescription>
                        Choose a .CSV file from your machine
                    </DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
};
