import { useModelsDb } from '@/hooks/useModelsDb';
import { ModelType } from '@/models/ImperativeModel';
import { JsonModel } from '@/models/JsonModel';
import Graphviz from 'graphviz-react';
import { EyeIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useAsync } from 'react-async-hook';
import { DeclareModel } from './DeclareModel';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from './button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';

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
                treeModel={model.result.model as JsonModel}
                className="lg:w-full max-h-80 overflow-y-auto"
            />
        );
    } else {
        content = (
            <div>
                <Graphviz
                    dot={model.result.model as string}
                    className="border-4"
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
                <div className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer">
                    <EyeIcon />
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
