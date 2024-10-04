import { Place } from '../Place';

export type STransition = {
    inputPlaces: Place[];
    outputPlaces: Place[];
    id: string;
    activity: string;
    cost: number;
    invisible: boolean;
};
