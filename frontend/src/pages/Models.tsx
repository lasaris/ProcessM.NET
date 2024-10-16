import { Button } from '@/components/ui/ShadCN/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { ViewModel } from '@/components/ui/ViewModel';
import { exportDot } from '@/helpers/exportDot';
import { exportJson } from '@/helpers/exportJson';
import { exportPnml } from '@/helpers/exportPnml';
import { useModelsDb } from '@/hooks/useModelsDb';
import Empty from '@/icons/Empty.svg';
import { RightArrow } from '@/icons/RightArrow';
import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import { ModelType } from '@/models/ImperativeModel';
import { TargetURL } from '@/router';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { TrashIcon } from 'lucide-react';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { useNavigate, useParams } from 'react-router-dom';

export const Models: React.FC = () => {
    const navigate = useNavigate();
    const { entityName } = useParams();
    const { fetchAllModelsByLogName, deleteModel } = useModelsDb();
    const localModels = useAsync(() => fetchAllModelsByLogName(entityName), []);

    const selectModel = (name: string, type: ModelType) => {
        const destination =
            type === ModelType.DECLARATIVE
                ? TargetURL.DECLARE_MODELS_OPERATION
                : TargetURL.IMPERATIVE_MODELS_OPERATION;

        navigate(destination.replace(':entityName', name));
    };

    const handleDeleteModel = async (key: string) => {
        const deleteResult = await deleteModel(key);

        if (deleteResult) {
            localModels.execute();
        }
    };

    if (localModels.loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <img className="w-20 h-20" src={SpinnerLogo} alt="loader" />
            </div>
        );
    }

    if (localModels.result == undefined || localModels.error) {
        return (
            <div className="w-full h-full flex items-centere justify-center">
                Unable to load models!
            </div>
        );
    }

    const models = localModels.result;

    if (models && models.length === 0) {
        return (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                <div className="w-1/8 items-center justify-center flex flex-col">
                    <img
                        src={Empty}
                        alt="No Logs"
                        className="w-1/8 h-1/8 md:w-1/3 mb-6"
                    />
                </div>
                <p className="text-gray-600 text-center mb-4">
                    There are no mined models under the current log. You have to
                    mine a log and save the mined model in order for models to
                    appear here
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center p-6">
            <div className="w-11/12 md:w-3/4 mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Mined Models
                </h1>
                <p className="text-gray-600">
                    Here is a list of mined models mined from the {entityName}{' '}
                    log. Declare models are mined using the Discover technique.
                    Imperative models are either mined by an Alpha miner or
                    Heuristic miner
                </p>
            </div>
            <div className="w-11/12 md:w-3/4 bg-white shadow-lg rounded-lg p-6">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b">
                            <TableHead>Name</TableHead>
                            <TableHead>Export</TableHead>
                            <TableHead className="text-center">
                                Type (Imperative/Declarative)
                            </TableHead>
                            <TableHead className="w-1/10">View</TableHead>
                            <TableHead className="w-1/10">Operations</TableHead>
                            <TableHead className="w-1/10 text-right">
                                Delete
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {models.map((model) => (
                            <TableRow key={model.name}>
                                <TableCell className="font-medium">
                                    {model.name}
                                </TableCell>
                                <TableCell>
                                    {model.type === ModelType.IMPERATIVE ? (
                                        <div className="flex gap-4">
                                            <Button
                                                onClick={() =>
                                                    exportPnml(
                                                        model.name,
                                                        model.model as string
                                                    )
                                                }
                                            >
                                                PNML
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    exportDot(
                                                        model.name,
                                                        model.model as string
                                                    )
                                                }
                                            >
                                                DOT
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                exportJson(
                                                    model.name,
                                                    JSON.stringify(
                                                        model.model,
                                                        undefined,
                                                        2
                                                    )
                                                )
                                            }
                                        >
                                            JSON
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                    {model.type === ModelType.IMPERATIVE
                                        ? 'Imperative'
                                        : 'Declarative'}
                                </TableCell>
                                <TableCell>
                                    <ViewModel title={model.name} />
                                </TableCell>
                                <TableCell>
                                    <TooltipWrapper
                                        tooltipContent={
                                            <p>{`${model.name} operations`}</p>
                                        }
                                    >
                                        <div
                                            onClick={() =>
                                                selectModel(
                                                    model.name,
                                                    model.type
                                                )
                                            }
                                            className="rounded-full w-8 h-8 flex items-center justify-center transition duration-200 cursor-pointer"
                                        >
                                            <RightArrow />
                                        </div>
                                    </TooltipWrapper>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex justify-end">
                                        <div
                                            onClick={() =>
                                                handleDeleteModel(model.name)
                                            }
                                            className="rounded-full w-8 h-8 flex items-center justify-center transition duration-200 cursor-pointer"
                                        >
                                            <TrashIcon />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
