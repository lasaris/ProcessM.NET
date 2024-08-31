import { useModelsDb } from '@/hooks/useModelsDb';
import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import Graphviz from 'graphviz-react';
import { EyeIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useAsync } from 'react-async-hook';
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
        content = <img className="w-20 h-20" src={SpinnerLogo} alt="loader" />;
    } else if (model.result == undefined) {
        content = <div>Unable to load the model :/</div>;
    } else {
        content = (
            <div>
                <Graphviz
                    dot={model.result.model}
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
