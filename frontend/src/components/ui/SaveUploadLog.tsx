import logsApi from '@/api/logs';
import { Button } from '@/components/ui/ShadCN/button';
import { Form, FormField, FormMessage } from '@/components/ui/ShadCN/form';
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
import { useTrySetTimestampFormat } from '@/hooks/apiHooks/useTrySetTimestampFormat';
import { useLogsDb } from '@/hooks/useLogsDb';
import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { IELWithTimestamp } from '@/models/API/IELWithTimestamp';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingSpinner } from './LoadingSpinner';
import { Switch } from './ShadCN/switch';
import { useToast } from './use-toast';

type SaveUploadLogProps = {
    eventLogAxiosResponse: AxiosResponse<any, any> | undefined;
    setOpenDialog: (value: React.SetStateAction<boolean>) => void;
    resetLogs: () => void;
};

type ConfigureLogFormType = {
    logName: string;
    containsTimestamp: boolean;
    timestamp: string | undefined;
};

const configureLogFormSchema = z.object({
    logName: z.string().min(3, 'The log name must be longer than 3 characters'),
    containsTimestamp: z.boolean(),
    timestamp: z.string().optional(),
});

export const SaveUploadLog: React.FC<SaveUploadLogProps> = ({
    eventLogAxiosResponse,
    setOpenDialog,
    resetLogs,
}) => {
    const { toast } = useToast();
    const { addIntoDb } = useLogsDb();
    const timestampFormatInputRef = useRef<HTMLInputElement>(null);
    const configureLogForm = useForm<ConfigureLogFormType>({
        resolver: zodResolver(configureLogFormSchema),
        defaultValues: {
            logName: '',
            containsTimestamp: false,
            timestamp: undefined,
        },
    });

    const {
        trySetTimestamp,
        timestampFormat,
        reset: resetTimestamp,
        isError: setTimestampFormatError,
        isPending,
        isSuccess: setTimestampFormatIsSuccess,
    } = useTrySetTimestampFormat();
    const containsTimestampWatch = configureLogForm.watch('containsTimestamp');
    const timestampWatch = configureLogForm.watch('timestamp');

    const importedEventLog = eventLogAxiosResponse?.data
        ? (eventLogAxiosResponse.data as ImportedEventLog)
        : undefined;

    const onCheckTimestamp = () => {
        if (!containsTimestampWatch || !importedEventLog) {
            toast({
                title: `Something went wrong!`,
                variant: 'destructive',
            });
            return;
        }

        if (!timestampWatch) {
            return;
        }

        const timestampIndex = importedEventLog.headers.findIndex(
            (header) => header === timestampWatch
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

    const saveLog = (configuredLog: ConfiguredLog) => {
        addIntoDb<ConfiguredLog>(
            configuredLog,
            STORES.Logs,
            configuredLog.metadata.name
        );

        configureLogForm.reset();
        setOpenDialog(false);
        resetLogs();
    };

    const checkOnLogSubmitErrors = (
        attributesFormData: ConfigureLogFormType
    ) => {
        const errors = [];

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

    const onSubmitConfiguredLogForm = async (
        configureLogFormData: ConfigureLogFormType
    ) => {
        const { logName, containsTimestamp } = configureLogFormData;

        if (!checkOnLogSubmitErrors(configureLogFormData)) {
            return;
        }

        if (!containsTimestamp) {
            const configuredLog: ConfiguredLog = {
                metadata: {
                    name: logName,
                },
                importedLog: importedEventLog!,
            };

            saveLog(configuredLog);
            return;
        }

        const timestampFormatTest = timestampFormatInputRef.current?.value;

        if (
            timestampFormat &&
            setTimestampFormatIsSuccess &&
            timestampFormatTest === timestampFormat.data
        ) {
            importedEventLog!.timestampFormat = timestampFormat.data;
        }

        if (
            setTimestampFormatError ||
            timestampFormat?.data !== timestampFormatTest
        ) {
            try {
                const importedEventLogWithTimestamp: IELWithTimestamp = {
                    importedLog: importedEventLog!,
                    timestampFormat: timestampFormatTest!,
                };

                await logsApi.trySetTimestampFormatManual(
                    importedEventLogWithTimestamp
                );
                importedEventLog!.timestampFormat = timestampFormatTest!;
            } catch (e) {
                toast({
                    title: 'Unable to set this timestamp format',
                    variant: 'destructive',
                });
                return;
            }
        }

        const configuredLog: ConfiguredLog = {
            metadata: {
                name: logName,
            },
            importedLog: importedEventLog!,
        };

        saveLog(configuredLog);
    };

    return (
        <Form {...configureLogForm}>
            <form
                className="flex flex-col gap-4"
                onSubmit={configureLogForm.handleSubmit(
                    onSubmitConfiguredLogForm
                )}
            >
                <FormField
                    control={configureLogForm.control}
                    name="logName"
                    render={({ field }) => {
                        return (
                            <div className="flex flex-col gap-2 justify-center w-full">
                                <Label htmlFor="file">Log Name</Label>
                                <Input id="file" onChange={field.onChange} />
                                <FormMessage />
                            </div>
                        );
                    }}
                />
                <FormField
                    control={configureLogForm.control}
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
                                        resetTimestamp();
                                        return field.onChange(checked);
                                    }}
                                />
                            </div>
                        );
                    }}
                />
                {containsTimestampWatch && (
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={configureLogForm.control}
                            name="timestamp"
                            render={({ field }) => {
                                return (
                                    <div>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                resetTimestamp();
                                            }}
                                        >
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
                                    </div>
                                );
                            }}
                        />
                        {isPending && (
                            <div>
                                <LoadingSpinner />
                            </div>
                        )}
                        {setTimestampFormatIsSuccess && timestampFormat && (
                            <div>
                                <Label htmlFor="timestampFormatInput">
                                    Parsed Timestamp Format
                                </Label>
                                <Input
                                    id="timestampFormatInput"
                                    defaultValue={timestampFormat.data}
                                    ref={timestampFormatInputRef}
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
                                    ref={timestampFormatInputRef}
                                />
                                <p className="text-sm text-red-500">
                                    Unable to automatically detect the timestamp
                                    format. Enter a valid one in C# notation.
                                </p>
                            </div>
                        )}
                        {!setTimestampFormatError &&
                            !setTimestampFormatIsSuccess && (
                                <Button
                                    type="button"
                                    onClick={onCheckTimestamp}
                                >
                                    Check Timestamp
                                </Button>
                            )}
                    </div>
                )}
                <Button
                    type="submit"
                    disabled={
                        containsTimestampWatch &&
                        !setTimestampFormatError &&
                        !setTimestampFormatIsSuccess
                    }
                >
                    Submit!
                </Button>
            </form>
        </Form>
    );
};
