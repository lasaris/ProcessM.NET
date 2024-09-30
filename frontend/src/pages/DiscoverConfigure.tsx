import { ConstraintConfigure } from '@/components/ui/ConstraintConfigure';
import { Accordion } from '@/components/ui/ShadCN/accordion';
import { Button } from '@/components/ui/ShadCN/button';
import { TargetURL } from '@/router';
import { useDiscoverStore } from '@/store/useDiscoverStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DiscoverConfigure: React.FC = () => {
    const { configurations } = useDiscoverStore();
    const navigate = useNavigate();
    const { entityName } = useParams();

    const handleSubmit = () => {
        if (entityName && configurations.length > 0) {
            navigate(
                TargetURL.DISCOVER_VIEW_MODEL.replace(':entityName', entityName)
            );
        }
    };

    const selectConstraints = () => {
        if (entityName) {
            navigate(
                TargetURL.DISCOVER_SELECT_CONSTRAINTS.replace(
                    ':entityName',
                    entityName
                )
            );
        }
    };

    const items = configurations.map((constraint) => {
        return (
            <ConstraintConfigure
                key={constraint.template}
                constraint={constraint}
            />
        );
    });

    return (
        <>
            {configurations.length > 0 && (
                <div className="relative w-full h-full flex flex-col items-center justify-between">
                    <div className="w-3/4">
                        <Accordion className="w-full" type="single" collapsible>
                            {items}
                        </Accordion>
                    </div>
                    <div className="sticky bottom-4 flex justify-end w-full px-4">
                        <Button onClick={handleSubmit}>Continue!</Button>
                    </div>
                </div>
            )}
            {configurations.length === 0 && (
                <div className="flex flex-col h-full w-full items-center justify-center gap-4 p-10 sm:px-14 md:px-20 lg:px-32 md:py-20 overflow-x-hidden text-justify">
                    <p>
                        There are no constraints selected for the current log.
                        Go back to the constraints selection.
                    </p>
                    <Button onClick={selectConstraints}>
                        Select Constraints!
                    </Button>
                </div>
            )}
        </>
    );
};
