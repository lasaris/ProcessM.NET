import { DeclareModel } from '@/components/ui/DeclareModel';
import { jsonModelExample } from '@/examples/exampleJsonModels/example';
import { safeJsonParse } from '@/helpers/safeJsonParse';
import { JsonModel } from '@/models/JsonModel';
import React from 'react';

export const DiscoverView: React.FC = () => {
    const parsed = safeJsonParse<JsonModel>(jsonModelExample);

    if (parsed) {
        return <DeclareModel className="w-full" model={parsed} />;
    }

    return <div>Unable to parse the json</div>;
};
