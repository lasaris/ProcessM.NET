import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/ShadCN/form';
import { Switch } from '@/components/ui/ShadCN/switch';
import { HeuristicMinerConfigurationType } from '@/models/schemas/HeuristicMinerConfiguration';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PMSlider } from '../PMSlider';

type HeuristicConfigsProps = {
    form: UseFormReturn<HeuristicMinerConfigurationType>;
};

export const HeuristicConfigs: React.FC<HeuristicConfigsProps> = ({ form }) => {
    const {
        direct,
        loopLengthAA,
        loopLengthABA,
        useLongDistance,
        allTasksConnected,
        relativeToBest,
        longDistance,
    } = form.watch();

    return (
        <div className="flex flex-col gap-8">
            <FormField
                control={form.control}
                name="direct"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                        <PMSlider
                            changeValue={field.onChange}
                            label={`Direct (a => b) - ${direct}`}
                            maxValue={1}
                            value={direct}
                            step={0.1}
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
                            label={`Loop Length 1 (A => A) - ${loopLengthAA}`}
                            maxValue={1}
                            value={loopLengthAA}
                            step={0.1}
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
                            label={`Direct (A => B => A) - ${loopLengthABA}`}
                            maxValue={1}
                            value={loopLengthABA}
                            step={0.1}
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
                            <FormLabel>All Connected</FormLabel>
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
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
        </div>
    );
};
