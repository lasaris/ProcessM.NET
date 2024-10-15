import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/ShadCN/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/ShadCN/select';
import { Switch } from '@/components/ui/ShadCN/switch';
import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ShadCN/button';
import { H4 } from '../typography/H4';
import { useToast } from '../use-toast';

type BasicConfigsProps = {
    form: UseFormReturn<AlphaMinerConfigurationType, any, undefined>;
    log?: ConfiguredLog;
};

export const BasicConfigs = ({ form, log }: BasicConfigsProps) => {
    const { toast } = useToast();

    if (log === undefined) {
        toast({
            title: 'Something went wrong',
            variant: 'destructive',
        });

        return <></>;
    }

    const logHeaders = log.importedLog.headers;
    const config = form.watch();

    return (
        <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-lg min-w-[400px]">
            <H4>Configure</H4>
            {logHeaders && logHeaders.length >= 2 && (
                <FormField
                    control={form.control}
                    name="caseId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">
                                Case ID
                            </FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Case ID" />
                                </SelectTrigger>
                                <SelectContent className="bg-white shadow-lg rounded-md">
                                    {logHeaders.map((header) => {
                                        if (header === '') return;

                                        return (
                                            <SelectItem
                                                key={header}
                                                value={header}
                                            >
                                                {header}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            )}

            {logHeaders && logHeaders.length >= 2 && (
                <FormField
                    control={form.control}
                    name="activity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">
                                Activity
                            </FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Activity" />
                                </SelectTrigger>
                                <SelectContent className="bg-white shadow-lg rounded-md">
                                    {logHeaders.map((header) => {
                                        if (header === '') return;

                                        return (
                                            <SelectItem
                                                key={header}
                                                value={header}
                                            >
                                                {header}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            )}

            <FormField
                control={form.control}
                name="ignoreFrequency"
                render={({ field }) => (
                    <FormItem className="flex flex-col justify-center">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                            Ignore Frequency
                        </FormLabel>
                        <FormControl>
                            <Switch
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                className="bg-gray-200 focus:ring-2 focus:ring-blue-500"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="sourcePetriNet"
                render={({ field }) => (
                    <FormItem className="flex flex-col justify-center">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                            Source Petri Net
                        </FormLabel>
                        <FormControl>
                            <Switch
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                className="bg-gray-200 focus:ring-2 focus:ring-blue-500"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                type="submit"
                onClick={() => {
                    console.log(config);
                }}
            >
                Mine
            </Button>
        </div>
    );
};
