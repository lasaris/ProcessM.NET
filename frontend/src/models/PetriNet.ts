import { Place } from './Place';
import { Transition } from './Transition';

export type PetriNet = {
    transitions?: Transition[];
    places?: Place[];
    startPlace?: Place;
    endPlace?: Place;
};
