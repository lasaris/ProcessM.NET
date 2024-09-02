import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { configureMinerFormSchema } from '@/pages/MinePage';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Switch } from './switch';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type VisibleTracesActivitiesProps = {
    activities: string[];
    form: UseFormReturn<z.infer<typeof configureMinerFormSchema>>;
};

export const VisibleActivitiesTrigger: React.FC<VisibleTracesActivitiesProps> = ({
    activities,
    form,
}) => {
    const [invisActivities, setInvisActivities] = useState<string[]>(
        form.getValues().invisibleActivities
    );

    const handleSubmit = () => {
        form.setValue('invisibleActivities', invisActivities);
    };

    const changeCheckedTrace = (act: string) => {
        if (invisActivities.includes(act)) {
            setInvisActivities((prevState) =>
                prevState.filter((a) => a !== act)
            );
            return;
        }

        setInvisActivities((prevState) => [...prevState, act]);
    };

    const content = (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Enable</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activities.map((activity) => {
                    return (
                        <TableRow key={activity}>
                            <TableCell>{activity}</TableCell>
                            <TableCell>
                                <Switch
                                    defaultChecked={
                                        !invisActivities.includes(activity)
                                    }
                                    onCheckedChange={() =>
                                        changeCheckedTrace(activity)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Activities</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set Visible Activities</DialogTitle>
                    <DialogDescription>
                        You can edit out Activities from the model here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">{content}</div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
