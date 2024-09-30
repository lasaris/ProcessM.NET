import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { Switch } from '@/components/ui/ShadCN/switch';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';

type VisibleTracesActivitiesProps = {
    activities: string[];
    form: UseFormReturn<AlphaMinerConfigurationType>;
};

export const VisibleActivitiesTrigger: React.FC<
    VisibleTracesActivitiesProps
> = ({ activities, form }) => {
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set Visible Activities</DialogTitle>
                    <DialogDescription>
                        You can edit out Activities from the model here.
                    </DialogDescription>
                </DialogHeader>
                <div className="gap-4 py-4 overflow-auto h-[350px]">
                    {content}
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
