import { ModelType } from './ImperativeModel';
import { JsonModel } from './JsonModel';
import { PetriNet } from './PetriNet';

export type ModelDB = {
    name: string;
    type: ModelType;
    model: string | JsonModel;
    declareModelJson?: string;
    petriNet?: PetriNet;
};
