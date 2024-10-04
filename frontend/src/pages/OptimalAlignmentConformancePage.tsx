import { AddTracesDialog } from '@/components/ui/AddTracesDialog';
import { SelectTraceTable } from '@/components/ui/conformance/SelectTraceTable';
import { TraceDTO } from '@/models/API/TraceDTO';
import { CONFORMANCE_TYPE } from '@/models/ConformanceType';
import React, { useState } from 'react';

export const OptimalAlignmentConformancePage: React.FC = () => {
    const [traces, setTraces] = useState<TraceDTO[]>([]);
    const [openAddTracesDialog, setOpenAddTraceDialog] = useState(false);

    const addTraces = (traces: TraceDTO[]) => {
        setTraces((prevState) => [...prevState, ...traces]);
    };

    const removeTrace = (trace: TraceDTO) => {
        setTraces((prevState) =>
            prevState.filter((t) => t.case !== trace.case)
        );
    };

    const closeDialog = () => {
        setOpenAddTraceDialog(false);
    };

    return (
        <div className="h-full w-full flex items-center flex-col">
            <SelectTraceTable
                traces={traces}
                removeTrace={removeTrace}
                conformanceType={CONFORMANCE_TYPE.ALIGNMENT}
            />
            <div className="sticky bottom-4 flex justify-end w-full px-4">
                <AddTracesDialog
                    open={openAddTracesDialog}
                    setOpen={setOpenAddTraceDialog}
                    addTraces={addTraces}
                    closeDialog={closeDialog}
                />
            </div>
        </div>
    );
};
