import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MineExportSection } from '@/components/ui/MineExportSection';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { Form } from '@/components/ui/ShadCN/form';
import { UnableToLoad } from '@/components/ui/UnableToLoad';
import { VisibleActivitiesTrigger } from '@/components/ui/VisibleActivitiesTrigger';
import { VisibleTracesTrigger } from '@/components/ui/VisibleTracesTrigger';
import { BasicConfigs } from '@/components/ui/imperativeMining/BasicConfigs';
import { useAlphaMine } from '@/hooks/apiHooks/useAlphaMine';
import { useModelExport } from '@/hooks/apiHooks/useModelExport';
import { useLogsDb } from '@/hooks/useLogsDb';
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
import { useAsync } from 'react-async-hook';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const AlphaMinerPage: React.FC = () => {
    const { entityName } = useParams();
    const { fetchSingleLog } = useLogsDb();

    const form = useForm<AlphaMinerConfigurationType>({
        resolver: zodResolver(AlphaMinerConfigurationSchema),
        defaultValues: {
            activity: '',
            caseId: '',
            ignoreFrequency: false,
            sourcePetriNet: false,
            invisibleTraces: [],
            invisibleActivities: [],
        },
    });

    const config = form.watch();
    const log = useAsync(() => fetchSingleLog(entityName || ''), []);
    const { data, isPending, isError, mine } = useAlphaMine();
    const { alphaPnmlExport } = useModelExport(entityName || '');

    if (isPending || log.loading) {
        return <LoadingSpinner />;
    }

    if (isError || log.error) {
        return <UnableToLoad />;
    }

    const exportPnmlHandler = () => {
        alphaPnmlExport(config);
    };

    let content: ReactNode;

    if (data) {
        content = (
            <Graphviz
                dot={data.data.minedModel}
                className="shadow-xl rounded-lg"
                options={{
                    zoom: true,
                    width: '',
                    height: '80vh',
                    scale: '0.8',
                    useWorker: false,
                }}
            />
        );
    } else {
        content = <></>;
    }

    const onSubmit = async (values: AlphaMinerConfigurationType) => {
        console.log(values);
        mine(values);
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
            {data && (
                <div className="flex flex-col p-4 gap-2 w-full md:w-3/4 md:h-[90%] ">
                    <h3 className="text-2xl font-semibold tracking-tight">
                        Alpha Miner
                    </h3>
                    {content}
                </div>
            )}
            <div className="p-4 flex flex-col items-center gap-2 grow h-full">
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <BasicConfigs form={form} log={log.result} />
                        {data && (
                            <div className="flex gap-3 p-6 bg-white rounded-lg shadow-lg">
                                <VisibleActivitiesTrigger
                                    activities={data.data.activities}
                                    form={form}
                                />
                                <VisibleTracesTrigger
                                    form={form}
                                    traces={traces}
                                />
                            </div>
                        )}
                    </form>
                </Form>
                {data && (
                    <MineExportSection
                        dotModel={data?.data.minedModel}
                        exportPnmlFunction={exportPnmlHandler}
                    />
                )}
                {data && (
                    <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-lg min-w-[400px]">
                        <SaveModelDialog
                            model={data?.data.minedModel}
                            petriNet={data?.data?.petriNet}
                            type={ModelType.IMPERATIVE}
                        />
                    </div>
                )}
            </div>
        </MinePageLayout>
    );
};
