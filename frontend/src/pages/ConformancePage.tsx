import { AddTracesDialog } from '@/components/ui/AddTracesDialog';
import { AddTracesFromNewCSVDialog } from '@/components/ui/conformance/AddTracesFromNewCSVDialog';
import { SelectTraceTable } from '@/components/ui/conformance/SelectTraceTable';
import { TraceDTO } from '@/models/API/TraceDTO';
import { CONFORMANCE_TYPE } from '@/models/ConformanceType';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const ConformancePage: React.FC = () => {
    const [traces, setTraces] = useState<TraceDTO[]>([]);
    const [openAddTracesDialog, setOpenAddTraceDialog] = useState(false);
    const [openAddTracesFromNewCsvDialog, setOpenAddTracesFromNewCsvDialog] =
        useState(false);
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

    const closeNewCsvDialog = () => {
        setOpenAddTracesFromNewCsvDialog(false);
    };

    return (
        <div className="h-full w-full flex items-center flex-col justify-between p-6">
            <div className="flex flex-col items-center w-full h-full">
                <div className="w-11/12 md:w-3/4 xl:w-1/2 mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Conformance Check
                    </h1>
                    <p className="text-gray-600">
                        Select a trace, on which you want to perform the
                        conformance check on the current model: "{entityName}"
                    </p>
                </div>
                <SelectTraceTable
                    traces={traces}
                    removeTrace={removeTrace}
                    conformanceType={CONFORMANCE_TYPE.DECLARE}
                />
            </div>
            <div className=" sticky bottom-4 flex flex-col md:flex-row justify-end w-full px-4 gap-3">
                <AddTracesFromNewCSVDialog
                    onSuccess={addTraces}
                    open={openAddTracesFromNewCsvDialog}
                    closeDialog={closeNewCsvDialog}
                    setOpen={setOpenAddTracesFromNewCsvDialog}
                />
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
