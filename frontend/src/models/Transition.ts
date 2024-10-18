import { Place } from './Place';

export type Transition = {
    inputPlaces: Place[];
    outputPlaces: Place[];
    id: string;
    activity: string;
    frequency: number;
    invisible: boolean;
};
