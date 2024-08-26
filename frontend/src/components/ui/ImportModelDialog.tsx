import React from 'react';
import { Button } from './button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';
import { Input } from './input';
import { Label } from './label';

export const ImportModelDialog: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Import PNML Model</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import Model</DialogTitle>
                    <DialogDescription>
                        Choose a .PNML file from your machine
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col py-4 gap-4 items-end">
                    <div className="flex flex-col gap-2 justify-center w-full">
                        <Label htmlFor="file">PNML Model</Label>
                        <Input id="file" type="file" accept=".pnml" />
                    </div>
                    <DialogClose asChild>
                        <Button className="w-1/4">Load</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};
