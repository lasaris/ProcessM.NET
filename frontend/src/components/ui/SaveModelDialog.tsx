import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/ShadCN/form';
import { Input } from '@/components/ui/ShadCN/input';
import { useModelsDb } from '@/hooks/useModelsDb';
import { ModelType } from '@/models/ImperativeModel';
import { ModelDB } from '@/models/ModelDB';
import { PetriNet } from '@/models/PetriNet';
import { TargetURL } from '@/router';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useToast } from './use-toast';

type SaveModelDialogProps = {
    model: string;
    declareModelJson?: string;
    petriNet?: PetriNet;
    type: ModelType;
};

const saveModelFormSchema = z.object({
    modelName: z.string().min(3, {
        message: 'Model name has to be at least 3 characters long',
    }),
});

export const SaveModelDialog: React.FC<SaveModelDialogProps> = ({
    model,
    declareModelJson,
    petriNet,
    type,
}) => {
    const { toast } = useToast();
    const { entityName } = useParams();
    const { addIntoDb } = useModelsDb();
    const [openSaveModelDialog, setOpenSaveModelDialog] =
        useState<boolean>(false);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof saveModelFormSchema>>({
        resolver: zodResolver(saveModelFormSchema),
        defaultValues: {
            modelName: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof saveModelFormSchema>) => {
        const modelDb: ModelDB = {
            eventLogName: entityName || '',
            name: values.modelName,
            type: type,
            model: model,
            declareModelJson: declareModelJson,
            petriNet: petriNet,
        };

        try {
            await addIntoDb(modelDb, values.modelName);
            setOpenSaveModelDialog(false);
            toast({
                title: 'Success!',
                description: 'Model was successfully added.',
                variant: 'default',
                action: (
                    <p
                        className="text-sm opacity-90 inline-block transition-transform duration-300 ease-in-out transform hover:scale-110"
                        onClick={() => {
                            if (entityName) {
                                navigate(
                                    TargetURL.MODELS_TABLE.replace(
                                        ':entityName',
                                        entityName
                                    )
                                );
                            }
                        }}
                    >
                        To models
                    </p>
                ),
            });
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog
            open={openSaveModelDialog}
            onOpenChange={setOpenSaveModelDialog}
        >
            <DialogTrigger asChild>
                <Button>Save Model</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Model</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Choose the name for your model
                </DialogDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="modelName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Cool Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Save!</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
