import { ModelType } from './ImperativeModel';
import { JsonModel } from './JsonModel';

export type ModelDB = {
    name: string;
    type: ModelType;
    model: string | JsonModel;
    declareModelJson?: string;
};
