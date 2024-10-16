import { AddTracesDialog } from '@/components/ui/AddTracesDialog';
import { SelectTraceTable } from '@/components/ui/conformance/SelectTraceTable';
import { TraceDTO } from '@/models/API/TraceDTO';
import { CONFORMANCE_TYPE } from '@/models/ConformanceType';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const OptimalAlignmentConformancePage: React.FC = () => {
    const [traces, setTraces] = useState<TraceDTO[]>([]);
    const [openAddTracesDialog, setOpenAddTraceDialog] = useState(false);
    const { entityName } = useParams();

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
        <div className="h-full w-full flex items-center flex-col justify-between p-6">
            <div className="flex flex-col items-center w-full h-full">
                <div className="w-11/12 md:w-3/4 xl:w-1/2 mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Optimal Alignments
                    </h1>
                    <p className="text-gray-600">
                        Select a trace, on which you want to find the optimal
                        alignment on the current model: "{entityName}"
                    </p>
                </div>
                <SelectTraceTable
                    traces={traces}
                    removeTrace={removeTrace}
                    conformanceType={CONFORMANCE_TYPE.ALIGNMENT}
                />
            </div>
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
