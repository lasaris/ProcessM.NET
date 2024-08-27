import logsApi from '@/api/logs';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useLogs = () => {
    const [parsedData, setParsedData] = useState<ImportedEventLog>();
    const { isPending, mutate, isSuccess, isError, reset } = useMutation({
        mutationFn: (file: FormData) => logsApi.uploadLog(file),
        onSuccess: (data) => {
            const apiData = data.data;

            if (apiData) {
                const importedEventLog: ImportedEventLog = {
                    activity: apiData.activity,
                    caseId: apiData.caseId,
                    headers: apiData.headers,
                    rows: apiData.rows,
                    timestamp: apiData.timestamp,
                    timestampFormat: apiData.timestampFormat,
                };

                setParsedData(importedEventLog);
            }
        },
    });

    return {
        uploadLog: mutate,
        data: parsedData,
        isPending,
        isSuccess,
        isError,
        reset,
    };
};
