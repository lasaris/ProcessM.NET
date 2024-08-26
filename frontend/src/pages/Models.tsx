import { ImportModelDialog } from '@/components/ui/ImportModelDialog';
import { ViewModel } from '@/components/ui/ViewModel';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dot } from '@/examples/exampleDots/dot';
import { pnml } from '@/examples/examplePNMLs/example';
import { exportDot } from '@/helpers/exportDot';
import { exportPnml } from '@/helpers/exportPnml';
import { RightArrow } from '@/icons/RightArrow';
import { Model, ModelType } from '@/models/ImperativeModel';
import { TargetURL } from '@/router';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { TrashIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const models: Model[] = [
    {
        name: 'Model Aardvark',
        size: '6.16 KB',
        modified: '09.08.2024 19:02',
        type: ModelType.IMPERATIVE,
    },
    {
        name: 'Model Bananarama',
        size: '6.16 KB',
        modified: '09.08.2024 19:02',
        type: ModelType.DECLARATIVE,
    },
    {
        name: 'Model Catastrophe',
        size: '6.16 KB',
        modified: '09.08.2024 19:02',
        type: ModelType.IMPERATIVE,
    },
    {
        name: 'Model Doodlebug',
        size: '6.16 KB',
        modified: '09.08.2024 19:02',
        type: ModelType.DECLARATIVE,
    },
    {
        name: 'Model Eggcellent',
        size: '6.16 KB',
        modified: '09.08.2024 19:02',
        type: ModelType.IMPERATIVE,
    },
    {
        name: 'Model Fandango',
        size: '6.16 KB',
        modified: '09.08.2024 19:02',
        type: ModelType.DECLARATIVE,
    },
];

export const Models: React.FC = () => {
    const navigate = useNavigate();

    const selectModel = (name: string) => {
        const destination = TargetURL.MODELS_OPERATION;
        navigate(destination.replace(':entityName', name));
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between">
            <div className="w-11/12 md:w-3/4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Export</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Last Modified</TableHead>
                            <TableHead className="text-center">
                                Type (Imperative/Declarative)
                            </TableHead>
                            <TableHead>View</TableHead>
                            <TableHead>Operations</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
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
                                                    exportPnml(model.name, pnml)
                                                }
                                            >
                                                PNML
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    exportDot(model.name, dot)
                                                }
                                            >
                                                DOT
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                exportPnml(model.name, pnml)
                                            }
                                        >
                                            JSON
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {model.size}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {model.modified}
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
                                        tooltipTitle={`${model.name} operations`}
                                    >
                                        <div
                                            onClick={() =>
                                                selectModel(model.name)
                                            }
                                            className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer"
                                        >
                                            <RightArrow />
                                        </div>
                                    </TooltipWrapper>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex justify-end">
                                        <div className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer">
                                            <TrashIcon />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="sticky bottom-4 flex justify-end w-full px-4">
                <ImportModelDialog />
            </div>
        </div>
    );
};
