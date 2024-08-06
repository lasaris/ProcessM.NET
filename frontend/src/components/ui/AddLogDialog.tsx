import React from 'react';
import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';
import { Input } from './input';
import { Label } from './label';

export const AddLogDialog: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="sticky bottom-4 float-right">Add Log</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Log</DialogTitle>
                    <DialogDescription>
                        Choose a .CSV file from your machine
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Log
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".csv"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Load</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
