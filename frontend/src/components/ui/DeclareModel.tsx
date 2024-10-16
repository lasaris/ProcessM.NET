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
        <div
            className={`border-4 w-full md:w-3/4 h-[60vh] overflow-y-hidden ${className}`}
        >
            <Graphviz
                dot={dotGraph}
                className="w-full"
                options={{
                    zoom: true,
                    width: '100%',
                    useWorker: false,
                }}
            />
        </div>
    );
};
