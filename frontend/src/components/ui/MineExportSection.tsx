import { exportDot } from '@/helpers/exportDot';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ExportButton } from './ExportButton';

type MineExportSectionProps = {
    dotModel: string;
    exportPnmlFunction: () => void;
};

export const MineExportSection: React.FC<MineExportSectionProps> = ({
    dotModel,
    exportPnmlFunction,
}) => {
    // TODO: implement the functionality
    const { entityName } = useParams();

    if (!entityName) {
        return;
    }

    return (
        <div className="flex justify-start w-5/6 gap-4">
            <ExportButton title="PNML" exportFunction={exportPnmlFunction} />
            <ExportButton
                title="DOT"
                exportFunction={() => exportDot(entityName, dotModel)}
            />
        </div>
    );
};
