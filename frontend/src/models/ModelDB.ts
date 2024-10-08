import { ModelType } from './ImperativeModel';
import { PetriNet } from './PetriNet';

export type ModelDB = {
    name: string;
    eventLogName: string;
    type: ModelType;
    model: string;
    declareModelJson?: string;
    petriNet?: PetriNet;
};
