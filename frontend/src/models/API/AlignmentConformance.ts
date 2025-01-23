import { PetriNet } from '../PetriNet';
import { Event } from './Event';

export type AlignmentConformance = {
    petriNet: PetriNet;
    trace: Event[];
};
