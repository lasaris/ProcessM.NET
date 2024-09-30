import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/ShadCN/form';
import { Separator } from '@/components/ui/ShadCN/separator';
import { Switch } from '@/components/ui/ShadCN/switch';
import { VisibleActivitiesTrigger } from '@/components/ui/VisibleActivitiesTrigger';
import { VisibleTracesTrigger } from '@/components/ui/VisibleTracesTrigger';
import { TraceWithOccurence } from '@/models/TraceWithOccurence';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import { UseFormReturn } from 'react-hook-form';

type BasicConfigsProps = {
    activities: string[];
    traces: TraceWithOccurence[];
    form: UseFormReturn<AlphaMinerConfigurationType, any, undefined>;
};

export const BasicConfigs = ({
    activities,
    form,
    traces,
}: BasicConfigsProps) => {
    return (
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="ignoreFrequency"
                render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                        <FormLabel>Ignore Frequency</FormLabel>
                        <FormControl>
                            <Switch
                                onCheckedChange={field.onChange}
                                checked={field.value}
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
                    <FormItem className="flex items-center gap-2">
                        <FormLabel>Source Petri Net</FormLabel>
                        <FormControl>
                            <Switch
                                onCheckedChange={field.onChange}
                                checked={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Separator />
            <div className="flex w-5/6 flex-start gap-4">
                <VisibleActivitiesTrigger activities={activities} form={form} />
                <VisibleTracesTrigger form={form} traces={traces} />
            </div>
        </div>
    );
};
