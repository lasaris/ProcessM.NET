import { Event } from './Event';

export type TraceDTO = {
    events: Event[];
    case: string;
};
