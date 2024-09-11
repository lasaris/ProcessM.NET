import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MineExportSection } from '@/components/ui/MineExportSection';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { UnableToLoad } from '@/components/ui/UnableToLoad';
import { Form } from '@/components/ui/form';
import { BasicConfigs } from '@/components/ui/imperativeMining/BasicConfigs';
import { HeuristicConfigs } from '@/components/ui/imperativeMining/HeuristicConfigs';
import { Separator } from '@/components/ui/separator';
import { useHeuristicMine } from '@/hooks/apiHooks/useHeuristicMine';
import { useModelExport } from '@/hooks/apiHooks/useModelExport';
import { MinePageLayout } from '@/layout/MinePageLayout';
import { ModelType } from '@/models/ImperativeModel';
import { TraceWithOccurence } from '@/models/TraceWithOccurence';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import {
    HeuristicMinerConfigurationSchema,
    HeuristicMinerConfigurationType,
} from '@/models/schemas/HeuristicMinerConfiguration';
import { zodResolver } from '@hookform/resolvers/zod';
import { Graphviz } from 'graphviz-react';
import React, { ReactNode } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const HeuristicMinerPage: React.FC = () => {
    const { entityName } = useParams();
    const form: UseFormReturn<HeuristicMinerConfigurationType, any, undefined> =
        useForm<HeuristicMinerConfigurationType>({
            resolver: zodResolver(HeuristicMinerConfigurationSchema),
            defaultValues: {
                ignoreFrequency: false,
                sourcePetriNet: false,
                invisibleTraces: [],
                invisibleActivities: [],
                direct: 0.9,
                loopLengthAA: 0.9,
                loopLengthABA: 0.9,
                relativeToBest: 0.05,
                longDistance: 0.9,
                allTasksConnected: true,
                useLongDistance: false,
            },
        });

    const { heuristicPnmlExport } = useModelExport(entityName || '');

    const config = form.watch();
    const { data, isLoading, isError } = useHeuristicMine(
        entityName || '',
        config
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <UnableToLoad />;
    }

    const exportPnmlHandler = () => {
        heuristicPnmlExport(config);
    };

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

    const onSubmit = async (values: AlphaMinerConfigurationType) => {
        console.log(values);
    };

    const traces: TraceWithOccurence[] = data?.data.tracesWithOccurence.map(
        (trace: any): TraceWithOccurence => {
            const activities = trace.item1.activities;
            const occurences = trace.item2;

            return {
                trace: activities,
                numberOfOccurences: occurences,
            };
        }
    );

    return (
        <MinePageLayout>
            <div className="flex items-start justify-center mt-4 w-full md:w-3/4 ">
                {content}
            </div>
            <div className="border-s p-4 flex flex-col gap-4 grow">
                <Form {...form}>
                    <form
                        className="grow flex flex-col gap-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Heuristic Miner
                        </h3>
                        <HeuristicConfigs form={form} />
                        <Separator className="" />
                        {data && (
                            <BasicConfigs
                                form={
                                    form as unknown as UseFormReturn<AlphaMinerConfigurationType>
                                }
                                activities={data.data.activities}
                                traces={traces}
                            />
                        )}
                    </form>
                </Form>
                <MineExportSection
                    dotModel={data?.data.minedModel}
                    exportPnmlFunction={exportPnmlHandler}
                />
                <Separator />
                <div className="flex w-5/6 justify-start">
                    <SaveModelDialog
                        model={data?.data.model}
                        type={ModelType.IMPERATIVE}
                    />
                </div>
            </div>
        </MinePageLayout>
    );
};
