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
import { HeuristicMinerConfigurationType } from '@/models/schemas/HeuristicMinerConfiguration';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PMSlider } from '../PMSlider';
import { Button } from '../ShadCN/button';
import { InfoTooltip } from '../common/InfoTooltip';
import { H4 } from '../typography/H4';
import { useToast } from '../use-toast';

type HeuristicConfigsProps = {
    form: UseFormReturn<HeuristicMinerConfigurationType>;
    log?: ConfiguredLog;
};

export const HeuristicConfigs: React.FC<HeuristicConfigsProps> = ({
    form,
    log,
}) => {
    const {
        direct,
        loopLengthAA,
        loopLengthABA,
        useLongDistance,
        allTasksConnected,
        relativeToBest,
        longDistance,
    } = form.watch();

    const { toast } = useToast();

    if (log === undefined) {
        toast({
            title: 'Something went wrong',
            variant: 'destructive',
        });

        return <></>;
    }

    const logHeaders = log.importedLog.headers;

    return (
        <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-lg min-w-[400px]">
            <H4>Basic Configuration</H4>
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
                name="sourcePetriNet"
                render={({ field }) => (
                    <FormItem className="flex flex-col justify-center">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                            Source Petri Net
                        </FormLabel>
                        <FormControl>
                            <InfoTooltip
                                tooltipContent={
                                    <p>
                                        If selected, places from petri net will
                                        be present in the mined model
                                    </p>
                                }
                            >
                                <Switch
                                    onCheckedChange={field.onChange}
                                    checked={field.value}
                                    className="bg-gray-200 focus:ring-2 focus:ring-blue-500"
                                />
                            </InfoTooltip>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <H4>Heuristic Miner Configuration</H4>
            <FormField
                control={form.control}
                name="direct"
                render={({ field }) => (
                    <FormItem className="">
                        <PMSlider
                            changeValue={field.onChange}
                            label={`Direct (a ⇒ b) - ${direct}`}
                            maxValue={1}
                            value={direct}
                            step={0.1}
                            tooltipDescription={
                                <p>
                                    Sets the confidence level for detecting
                                    direct relationships, where activity A
                                    frequently leads directly to activity B.
                                </p>
                            }
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="loopLengthAA"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                        <PMSlider
                            changeValue={field.onChange}
                            label={`Loop Length 1 (A ⇒ A) - ${loopLengthAA}`}
                            maxValue={1}
                            value={loopLengthAA}
                            step={0.1}
                            tooltipDescription={
                                <p>
                                    Specifies the minimum frequency for
                                    identifying self-loops, where an activity
                                    repeats consecutively.
                                </p>
                            }
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="loopLengthABA"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                        <PMSlider
                            changeValue={field.onChange}
                            label={`Direct (A ⇒ B ⇒ A) - ${loopLengthABA}`}
                            maxValue={1}
                            value={loopLengthABA}
                            step={0.1}
                            tooltipDescription={
                                <p>
                                    Defines the confidence level for two-step
                                    loops, where an activity A leads to B and
                                    then returns to A.
                                </p>
                            }
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="allTasksConnected"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <InfoTooltip
                                tooltipContent={
                                    <p>
                                        Each non-initial activity must have at
                                        least one other activity as a cause (arc
                                        in).
                                    </p>
                                }
                            >
                                <FormLabel>All Connected</FormLabel>
                            </InfoTooltip>
                            <Switch
                                onCheckedChange={field.onChange}
                                checked={field.value}
                            />
                        </FormItem>
                    )}
                />
                {allTasksConnected && (
                    <FormField
                        control={form.control}
                        name="relativeToBest"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <PMSlider
                                    changeValue={field.onChange}
                                    label={`Relative To Best Modifier - ${relativeToBest}`}
                                    maxValue={1}
                                    value={relativeToBest}
                                    step={0.1}
                                    tooltipDescription={
                                        <p>
                                            The percentage for the admissible
                                            distance between "directly follows"
                                            relations for an activity and the
                                            activity's best one. At 0, only the
                                            best "directly follows" relation
                                            will be shown for every activity. At
                                            1, all will be shown.
                                        </p>
                                    }
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
            <div className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="useLongDistance"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormLabel>Long distance</FormLabel>
                            <Switch
                                onCheckedChange={field.onChange}
                                checked={field.value}
                            />
                        </FormItem>
                    )}
                />
                {useLongDistance && (
                    <FormField
                        control={form.control}
                        name="longDistance"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <PMSlider
                                    changeValue={field.onChange}
                                    label={`Long distance: (a => *b) - ${longDistance}`}
                                    maxValue={1}
                                    value={longDistance}
                                    step={0.1}
                                    tooltipDescription={
                                        <p>
                                            A threshold for the strength of the
                                            eventually follows relation.
                                        </p>
                                    }
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
            <Button type="submit">Mine</Button>
        </div>
    );
};
