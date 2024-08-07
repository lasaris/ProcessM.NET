import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
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
import { Separator } from './separator';

export const AddLogDialog: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const loadLog = () => {
        setIsLoaded(true);
    };

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
                <div className="flex flex-col py-4 gap-4">
                    <div className="flex flex-col gap-2 justify-center w-full">
                        <Label htmlFor="file" className="w-1/6">
                            Log
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".csv"
                            className="w-5/6"
                        />
                    </div>
                    {!isLoaded && (
                        <Button className="w-1/4" onClick={loadLog}>
                            Load
                        </Button>
                    )}
                </div>

                {isLoaded && (
                    <div className="flex flex-col gap-4 items-end">
                        <Separator />

                        <div className="flex flex-col gap-2 justify-center w-full">
                            <Label className="w-1/6">Case ID</Label>
                            <Select>
                                <SelectTrigger className="w-5/6">
                                    <SelectValue placeholder="Case ID" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="act">act</SelectItem>
                                    <SelectItem value="id">id</SelectItem>
                                    <SelectItem value="timestamp">
                                        timestamp
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <Label className="w-1/6">Activity</Label>
                            <Select>
                                <SelectTrigger className="w-5/6">
                                    <SelectValue placeholder="Activity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="act">act</SelectItem>
                                    <SelectItem value="id">id</SelectItem>
                                    <SelectItem value="timestamp">
                                        timestamp
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <Label className="w-1/6">Timestamp</Label>
                            <Select>
                                <SelectTrigger className="w-5/6">
                                    <SelectValue placeholder="Timestamp" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="act">act</SelectItem>
                                    <SelectItem value="id">id</SelectItem>
                                    <SelectItem value="timestamp">
                                        timestamp
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter className="w-full">
                            <Button
                                type="submit"
                                className="w-1/4"
                                onClick={() => {
                                    setIsLoaded(false);
                                }}
                            >
                                Load
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
