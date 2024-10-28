import { exportDot } from '@/helpers/exportDot';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ExportButton } from './ExportButton';
import { H4 } from './typography/H4';

type MineExportSectionProps = {
    dotModel: string;
};

export const MineExportSection: React.FC<MineExportSectionProps> = ({
    dotModel,
}) => {
    const { entityName } = useParams();

    if (!entityName) {
        return;
    }

    return (
        <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-lg min-w-[400px]">
            <H4>Export</H4>
            <div className="flex justify-start gap-4">
                <ExportButton
                    title="DOT"
                    exportFunction={() => exportDot(entityName, dotModel)}
                />
            </div>
        </div>
    );
};
