import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { useLogs } from '@/hooks/apiHooks/useLogs';
import React, { useState } from 'react';
import { SaveUploadLog } from './SaveUploadLog';
import { UploadLogFile } from './UploadLogFile';

type AddLogDialogProps = {
    resetLogs: () => void;
};

export const AddLogDialog: React.FC<AddLogDialogProps> = ({ resetLogs }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const {
        uploadLog,
        isPending,
        data: importedEventLogData,
        reset,
    } = useLogs();

    return (
        <Dialog
            open={openDialog}
            onOpenChange={() => {
                setOpenDialog((prevState) => !prevState);
                reset();
            }}
        >
            <DialogTrigger asChild>
                <Button>Add Log</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Log</DialogTitle>
                    <DialogDescription>
                        Choose a .CSV file from your machine
                    </DialogDescription>
                </DialogHeader>
                {importedEventLogData === undefined && (
                    <UploadLogFile
                        uploadLog={uploadLog}
                        isPending={isPending}
                    />
                )}
                {importedEventLogData !== undefined && (
                    <SaveUploadLog
                        eventLogAxiosResponse={importedEventLogData}
                        resetLogs={resetLogs}
                        setOpenDialog={setOpenDialog}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
