import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MineExportSection } from '@/components/ui/MineExportSection';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { UnableToLoad } from '@/components/ui/UnableToLoad';
import { VisibleActivitiesTrigger } from '@/components/ui/VisibleActivitiesTrigger';
import { VisibleTracesTrigger } from '@/components/ui/VisibleTracesTrigger';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAlphaMine } from '@/hooks/apiHooks/useAlphaMine';
import { MinePageLayout } from '@/layout/MinePageLayout';
import { MINER_TYPE } from '@/models/MinerType';
import { TraceWithOccurence } from '@/models/TraceWithOccurence';
import { zodResolver } from '@hookform/resolvers/zod';
import { Graphviz } from 'graphviz-react';
import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

type MinePageProps = {
    miningType: MINER_TYPE;
};

export const configureMinerFormSchema = z.object({
    ignoreFrequency: z.boolean(),
    sourcePetriNet: z.boolean(),
    invisibleTraces: z.array(z.array(z.string())),
    invisibleActivities: z.array(z.string()),
});

export const MinePage: React.FC<MinePageProps> = ({ miningType }) => {
    const { entityName } = useParams();
    const form = useForm<z.infer<typeof configureMinerFormSchema>>({
        resolver: zodResolver(configureMinerFormSchema),
        defaultValues: {
            ignoreFrequency: false,
            sourcePetriNet: true,
            invisibleTraces: [],
            invisibleActivities: [],
        },
    });

    const config = form.watch();
    const { data, isLoading, isError } = useAlphaMine(entityName || '', config);

    console.log('Logging the data: ', data);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <UnableToLoad />;
    }

    let content: ReactNode = <div>Unable to load</div>;

    if (data) {
        content = (
            <Graphviz
                dot={data.data.minedModel}
                className="border-4"
                options={{
                    zoom: true,
                    width: '70vw',
                    height: '80vh',
                    useWorker: false,
                }}
            />
        );
    }

    const onSubmit = async (
        values: z.infer<typeof configureMinerFormSchema>
    ) => {
        console.log(values);
    };

    return (
        <MinePageLayout>
            <div className="flex items-center justify-center w-full md:w-3/4 ">
                {content}
            </div>
            <Form {...form}>
                <form
                    className="grow border-s p-4 flex flex-col gap-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {miningType === MINER_TYPE.ALPHA
                            ? 'Alpha Miner'
                            : 'Heuristic Miner'}
                    </h3>
                    <Separator className="" />
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
                        <VisibleActivitiesTrigger
                            activities={data?.data.activities}
                            form={form}
                        />
                        <VisibleTracesTrigger
                            form={form}
                            traces={data?.data.tracesWithOccurence.map(
                                (trace: any): TraceWithOccurence => {
                                    const activities = trace.item1.activities;
                                    const occurences = trace.item2;

                                    return {
                                        trace: activities,
                                        numberOfOccurences: occurences,
                                    };
                                }
                            )}
                        />
                    </div>
                    {data && <MineExportSection model={data.data} />}
                    <Separator />
                    <div className="flex w-5/6 justify-start">
                        {data && (
                            <SaveModelDialog model={data.data.minedModel} />
                        )}
                    </div>
                </form>
            </Form>
        </MinePageLayout>
    );
};
