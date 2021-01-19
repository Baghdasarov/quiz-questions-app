// Import action type
import { START, RESTART } from './start.counter.types';

export const switchStart = (context) => {
    return {
        type: START,
        payload: context
    };
};

export const switchRestart = (context) => {
    return {
        type: RESTART,
        payload: context
    };
};