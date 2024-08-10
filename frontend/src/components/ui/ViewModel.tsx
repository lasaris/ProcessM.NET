import { dot } from '@/exampleDots/dot';
import Graphviz from 'graphviz-react';
import { EyeIcon } from 'lucide-react';
import React from 'react';
import { Button } from './button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';

export type ViewModelProps = {
    title: string;
};

export const ViewModel: React.FC<ViewModelProps> = ({ title }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer">
                    <EyeIcon />
                </div>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>View the mined model.</DialogDescription>
                </DialogHeader>
                <div>
                    <Graphviz
                        dot={dot}
                        className="border-4"
                        options={{
                            zoom: true,
                            width: '100%',
                            useWorker: false,
                        }}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
