import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { RightArrow } from '@/icons/RightArrow';
import { ImperativeModel } from '@/models/ImperativeModel';
import React from 'react';

const models: ImperativeModel[] = [
    {
        name: 'Log Aardvark',
    },
    {
        name: 'Log Bananarama',
    },
    {
        name: 'Log Catastrophe',
    },
    {
        name: 'Log Doodlebug',
    },
    {
        name: 'Log Eggcellent',
    },
    {
        name: 'Log Fandango',
    },
    {
        name: 'Log Aardvark',
    },
    {
        name: 'Log Bananarama',
    },
    {
        name: 'Log Catastrophe',
    },
    {
        name: 'Log Doodlebug',
    },
    {
        name: 'Log Eggcellent',
    },
    {
        name: 'Log Fandango',
    },
    {
        name: 'Log Aardvark',
    },
    {
        name: 'Log Bananarama',
    },
    {
        name: 'Log Catastrophe',
    },
    {
        name: 'Log Doodlebug',
    },
    {
        name: 'Log Eggcellent',
    },
    {
        name: 'Log Fandango',
    },
];

export const ImperativeModels: React.FC = () => {
    return (
        <div className="w-11/12 md:w-3/4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {models.map((log) => (
                        <TableRow key={log.name}>
                            <TableCell className="font-medium">
                                {log.name}
                            </TableCell>
                            <TableCell className="flex items-end justify-end">
                                <div className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer">
                                    <RightArrow />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
