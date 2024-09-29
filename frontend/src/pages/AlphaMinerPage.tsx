import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MineExportSection } from '@/components/ui/MineExportSection';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { UnableToLoad } from '@/components/ui/UnableToLoad';
import { Form } from '@/components/ui/form';
import { BasicConfigs } from '@/components/ui/imperativeMining/BasicConfigs';
import { Separator } from '@/components/ui/separator';
import { useAlphaMine } from '@/hooks/apiHooks/useAlphaMine';
import { useModelExport } from '@/hooks/apiHooks/useModelExport';
import { MinePageLayout } from '@/layout/MinePageLayout';
import { ModelType } from '@/models/ImperativeModel';
import { TraceWithOccurence } from '@/models/TraceWithOccurence';
import {
    AlphaMinerConfigurationSchema,
    AlphaMinerConfigurationType,
} from '@/models/schemas/AlphaMinerConfiguration';
import { zodResolver } from '@hookform/resolvers/zod';
import { Graphviz } from 'graphviz-react';
import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const AlphaMinerPage: React.FC = () => {
    const { entityName } = useParams();
    const form = useForm<AlphaMinerConfigurationType>({
        resolver: zodResolver(AlphaMinerConfigurationSchema),
        defaultValues: {
            ignoreFrequency: false,
            sourcePetriNet: false,
            invisibleTraces: [],
            invisibleActivities: [],
        },
    });

    const config = form.watch();
    const { data, isLoading, isError } = useAlphaMine(entityName || '', config);
    const { alphaPnmlExport } = useModelExport(entityName || '');

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <UnableToLoad />;
    }

    const exportPnmlHandler = () => {
        alphaPnmlExport(config);
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

    const onSubmit = async (values: AlphaMinerConfigurationType) => {};

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
            <div className="flex items-center justify-center w-full md:w-3/4 ">
                {content}
            </div>
            <div className="border-s p-4 flex flex-col gap-4 grow">
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Alpha Miner
                        </h3>
                        <Separator className="" />
                        {data && (
                            <BasicConfigs
                                form={form}
                                activities={data.data.activities}
                                traces={traces}
                            />
                        )}
                    </form>
                </Form>
                <Separator />
                <MineExportSection
                    dotModel={data?.data.minedModel}
                    exportPnmlFunction={exportPnmlHandler}
                />
                <Separator />
                <div className="flex w-5/6 justify-start">
                    <SaveModelDialog
                        model={data?.data.minedModel}
                        type={ModelType.IMPERATIVE}
                    />
                </div>
            </div>
        </MinePageLayout>
    );
};
