import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { Input } from '@/components/ui/ShadCN/input';
import { Label } from '@/components/ui/ShadCN/label';
import React from 'react';

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
