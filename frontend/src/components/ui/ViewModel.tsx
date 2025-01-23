import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { useModelsDb } from '@/hooks/useModelsDb';
import { ModelType } from '@/models/ImperativeModel';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import Graphviz from 'graphviz-react';
import { EyeIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useAsync } from 'react-async-hook';
import { DeclareModel } from './DeclareModel';
import { LoadingSpinner } from './LoadingSpinner';

export type ViewModelProps = {
    title: string;
};

export const ViewModel: React.FC<ViewModelProps> = ({ title }) => {
    const { fetchSingleModel } = useModelsDb();
    const model = useAsync(() => fetchSingleModel(title), []);

    let content: ReactNode;

    if (model.loading) {
        content = <LoadingSpinner />;
    } else if (model.result == undefined) {
        content = <div>Unable to load the model :/</div>;
    } else if (model.result.type === ModelType.DECLARATIVE) {
        content = (
            <DeclareModel
                dotGraph={model.result.model}
                className="lg:w-full max-h-80 overflow-y-auto"
            />
        );
    } else {
        content = (
            <div className="flex items-center justify-center w-full ">
                <Graphviz
                    dot={model.result.model as string}
                    className="w-full shadow-lg"
                    options={{
                        zoom: true,
                        width: '100%',
                        useWorker: false,
                    }}
                />
            </div>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full w-8 h-8 flex items-center justify-center transition duration-200 cursor-pointer">
                    <TooltipWrapper
                        tooltipContent={<p>View the mined model</p>}
                    >
                        <EyeIcon />
                    </TooltipWrapper>
                </div>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>View the mined model.</DialogDescription>
                </DialogHeader>
                {content}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
