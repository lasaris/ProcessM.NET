import { Event } from './Event';

export type ConformanceDeclare = {
    DeclareModel: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    Trace: Event[];
};
