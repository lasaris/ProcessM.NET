import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useLogsDb } from '@/hooks/useLogsDb';
import { SelectLogSchema, SelectLogType } from '@/models/schemas/SelectLog';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingSpinner } from '../LoadingSpinner';
import { Button } from '../button';
import { Form, FormField } from '../form';
import { Label } from '../label';

type SelectLogFormProps = {
    getEventLog: (name: string) => void;
};

export const SelectLogForm: React.FC<SelectLogFormProps> = ({
    getEventLog,
}) => {
    const submitHandler: SubmitHandler<SelectLogType> = async (
        value: SelectLogType
    ) => {
        getEventLog(value.name);
    };
    const { fetchAllLogs } = useLogsDb();
    const localLogs = useAsync(fetchAllLogs, []);
    const form = useForm<SelectLogType>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(SelectLogSchema),
    });

    if (localLogs.result) {
        const logItems = localLogs.result.map((log) => {
            return (
                <SelectItem key={log.metadata.name} value={log.metadata.name}>
                    {log.metadata.name}
                </SelectItem>
            );
        });

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
