import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { STORES } from '@/db/db';
import { useLogs } from '@/hooks/apiHooks/useLogs';
import { useLogsDb } from '@/hooks/useLogsDb';
import { ConfiguredLog, Metadata } from '@/models/API/ConfiguredLog';
import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';
import { Form, FormField } from './form';
import { Input } from './input';
import { Label } from './label';
import { Separator } from './separator';

type ConfigurationFormType = {
    logName: string;
    activity: string;
    caseId: string;
    timestamp: string | undefined;
};

type AddLogDialogProps = {
    resetLogs: () => void;
};

export const AddLogDialog: React.FC<AddLogDialogProps> = ({ resetLogs }) => {
    const [file, setFile] = useState<FormData>();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { uploadLog, data, isSuccess, reset } = useLogs();
    const form = useForm<ConfigurationFormType>();
    const { addIntoDb } = useLogsDb();

    const loadLog = () => {
        if (file) {
            uploadLog(file);
        }
    };

    const onSubmit: SubmitHandler<ConfigurationFormType> = async (formData) => {
        console.log(formData);
        if (file && data) {
            const fileInfo = file.get('file');

            if (fileInfo instanceof File) {
                let metadata: Metadata = {
                    name: formData.logName,
                    modified: fileInfo.lastModified,
                    size: fileInfo.size,
                };

                data.activity = data.headers.indexOf(formData.activity);
                data.caseId = data.headers.indexOf(formData.caseId);
                // TODO: Set timestamp

                const configuredLog: ConfiguredLog = {
                    metadata,
                    importedLog: data,
                };

                const addIntoDbResult = await addIntoDb(
                    configuredLog,
                    STORES.Logs,
                    formData.logName
                );

                if (addIntoDbResult) {
                    setFile(undefined);
                    reset();
                    setOpenDialog(false);
                    resetLogs();
                }
            }
        }
    };

    const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e?.target?.files) {
            const selectedFile = e?.target?.files[0];

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                setFile(formData);
            }
        }
    };

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
                <div className="flex flex-col py-4 gap-4">
                    <div className="flex flex-col gap-2 justify-center w-full">
                        <Label htmlFor="file" className="w-1/6">
                            Log
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".csv"
                            onChange={onFileSelect}
                        />
                    </div>
                    {!isSuccess && (
                        <Button className="w-1/4" onClick={loadLog}>
                            Load
                        </Button>
                    )}
                </div>

                {isSuccess && data && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-4 items-end">
                                <Separator />
                                <FormField
                                    control={form.control}
                                    name="logName"
                                    render={({ field }) => {
                                        return (
                                            <div className="flex flex-col gap-2 justify-center w-full">
                                                <Label className="w-1/6">
                                                    Log Name
                                                </Label>
                                                <Input
                                                    onChange={field.onChange}
                                                    id="logName"
                                                />
                                            </div>
                                        );
                                    }}
                                />
                                <Separator />
                                <FormField
                                    control={form.control}
                                    name="caseId"
                                    render={({ field }) => {
                                        return (
                                            <div className="flex flex-col gap-2 justify-center w-full">
                                                <Label className="w-1/6">
                                                    Case ID
                                                </Label>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Case ID" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {data?.headers.map(
                                                            (
                                                                header: string
                                                            ) => {
                                                                if (
                                                                    header ===
                                                                    ''
                                                                ) {
                                                                    return;
                                                                }

                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            header
                                                                        }
                                                                        value={
                                                                            header
                                                                        }
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
                                <FormField
                                    control={form.control}
                                    name="activity"
                                    render={({ field }) => {
                                        return (
                                            <div className="flex flex-col gap-2 justify-center w-full">
                                                <Label className="w-1/6">
                                                    Activity
                                                </Label>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Activity" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {data?.headers.map(
                                                            (
                                                                header: string
                                                            ) => {
                                                                if (
                                                                    header ===
                                                                    ''
                                                                ) {
                                                                    return;
                                                                }
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            header
                                                                        }
                                                                        value={
                                                                            header
                                                                        }
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
                                <FormField
                                    control={form.control}
                                    name="timestamp"
                                    render={({ field }) => {
                                        return (
                                            <div className="flex flex-col gap-2 justify-center w-full">
                                                <Label className="w-1/6">
                                                    Timestamp
                                                </Label>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Timestamp" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {data?.headers.map(
                                                            (
                                                                header: string
                                                            ) => {
                                                                if (
                                                                    header ===
                                                                    ''
                                                                ) {
                                                                    return;
                                                                }
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            header
                                                                        }
                                                                        value={
                                                                            header
                                                                        }
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
                                <DialogFooter className="w-full">
                                    <Button type="submit" className="w-1/4">
                                        Upload
                                    </Button>
                                </DialogFooter>
                            </div>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
};
