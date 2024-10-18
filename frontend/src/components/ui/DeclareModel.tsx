import Graphviz from 'graphviz-react';
import React from 'react';

type DeclareModelProps = {
    dotGraph: string;
    className?: string;
};

export const DeclareModel: React.FC<DeclareModelProps> = ({
    dotGraph,
    className,
}) => {
    return (
        <div className={`w-full h-[60vh] overflow-y-hidden ${className}`}>
            <Graphviz
                dot={dotGraph}
                className="w-full h-full border-gray-200 border-2"
                options={{
                    zoom: true,
                    width: '100%',
                    height: '',
                    useWorker: false,
                }}
            />
        </div>
    );
};
