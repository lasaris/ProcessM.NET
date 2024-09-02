import React from 'react';
import { ExportButton } from './ExportButton';

type MineExportSectionProps = {
    model: string;
};

export const MineExportSection: React.FC<MineExportSectionProps> = ({
    model,
}) => {
    // TODO: implement the functionality
    return (
        <div className="flex justify-start w-5/6 gap-4">
            <ExportButton
                title="PNML"
                exportFunction={() => console.log('PNML Download' + model)}
            />
            <ExportButton
                title="DOT"
                exportFunction={() => console.log('DOT Download' + model)}
            />
        </div>
    );
};
