import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { JsonModel } from '@/models/JsonModel';
import React from 'react';

type DeclareModelProps = {
    treeModel: JsonModel;
    className?: string;
};

export const DeclareModel: React.FC<DeclareModelProps> = ({
    treeModel,
    className,
}) => {
    const displayNodes = (model: JsonModel, index: number = 0): JSX.Element => {
        const { name, nodes } = model;

        if (nodes && nodes.length > 0) {
            return (
                <AccordionItem
                    key={name}
                    value={name}
                    className="border border-gray-200 rounded-lg mb-2 shadow-sm"
                >
                    <AccordionTrigger className="px-4 py-2 bg-gray-100 text-left font-medium rounded-t-lg transition duration-300">
                        {name}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 bg-gray-50 border-t rounded-b-lg border-gray-200">
                        <Accordion type="single" collapsible>
                            {nodes.map((node, idx) =>
                                displayNodes(node, index + idx + 1)
                            )}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            );
        }

        return (
            <div
                key={name}
                className="font-medium px-4 py-2 text-gray-800 bg-white border border-gray-100 rounded-t-lg mb-2 shadow-sm"
            >
                {name}
            </div>
        );
    };

    return (
        <Accordion
            type="single"
            collapsible
            className={`p-4 h-full w-full lg:w-3/4 ${className}`}
        >
            <AccordionItem
                value="item"
                className="px-4 mb-2 shadow-sm bg-gray-200 rounded-lg"
            >
                <AccordionTrigger>{treeModel.name}</AccordionTrigger>
                <AccordionContent>
                    {treeModel.nodes.map((node) => {
                        return (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full lg:px-10"
                                key={node.name}
                            >
                                {displayNodes(node, 0)}
                            </Accordion>
                        );
                    })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
