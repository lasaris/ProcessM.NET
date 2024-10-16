import { Button } from '@/components/ui/ShadCN/button';
import { Form, FormField } from '@/components/ui/ShadCN/form';
import { Label } from '@/components/ui/ShadCN/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import { useLogsDb } from '@/hooks/useLogsDb';
import { SelectLogSchema, SelectLogType } from '@/models/schemas/SelectLog';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingSpinner } from '../LoadingSpinner';
import { useToast } from '../use-toast';

type SelectLogFormProps = {
    getEventLog: (values: SelectLogType) => void;
};

export const SelectLogForm: React.FC<SelectLogFormProps> = ({
    getEventLog,
}) => {
    const { toast } = useToast();
    const submitHandler: SubmitHandler<SelectLogType> = async (
        values: SelectLogType
    ) => {
        getEventLog(values);
    };
    const { fetchAllLogs } = useLogsDb();
    const localLogs = useAsync(fetchAllLogs, []);
    const form = useForm<SelectLogType>({
        defaultValues: {
            name: '',
            activity: '',
            caseId: '',
        },
        resolver: zodResolver(SelectLogSchema),
    });
    const nameWatch = form.watch().name;

    if (localLogs.result) {
        const logItems = localLogs.result.map((log) => {
            return (
                <SelectItem key={log.metadata.name} value={log.metadata.name}>
                    {log.metadata.name}
                </SelectItem>
            );
        });

        const currentLogIndex = localLogs.result.findIndex(
            (log) => log.metadata.name === nameWatch
        );

        if (currentLogIndex === -1 && nameWatch !== '') {
            toast({
                title: 'Something went wrong',
                variant: 'destructive',
            });
            return;
        }

        const currentLogHeaders =
            currentLogIndex !== -1
                ? localLogs.result[currentLogIndex].importedLog.headers.map(
                      (header, index) => {
                          return (
                              <SelectItem key={index} value={header}>
                                  {header}
                              </SelectItem>
                          );
                      }
                  )
                : [];

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitHandler)}
                    className="flex flex-col gap-3"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                            return (
                                <div className="flex flex-col gap-2 justify-center w-full">
                                    <Label>Select Log</Label>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Log Name" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {logItems}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        }}
                    />
                    {nameWatch !== '' && currentLogHeaders.length > 0 && (
                        <FormField
                            control={form.control}
                            name="caseId"
                            render={({ field }) => {
                                return (
                                    <div className="flex flex-col gap-2 justify-center w-full">
                                        <Label>Select Case ID</Label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Case ID" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {currentLogHeaders}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }}
                        />
                    )}
                    {nameWatch !== '' && currentLogHeaders.length > 0 && (
                        <FormField
                            control={form.control}
                            name="activity"
                            render={({ field }) => {
                                return (
                                    <div className="flex flex-col gap-2 justify-center w-full">
                                        <Label>Select Activity</Label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Activity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {currentLogHeaders}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }}
                        />
                    )}
                    <Button
                        type="submit"
                        disabled={!form.formState.isValid}
                        className="w-full md:w-1/3"
                    >
                        Load Traces
                    </Button>
                </form>
            </Form>
        );
    }

    return <LoadingSpinner />;
};
