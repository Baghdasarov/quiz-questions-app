// Import counter actions counter types helper
import { START, RESTART } from './start.counter.types';

// Initial state which will set redux values
const INITIAL_STATE = {
    restart: false,
    start: false
};

// Reducer variable holder
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START:
            return {
                ...state, start: !!action.payload,
            };
        case RESTART:
            return {
                ...state, restart: !!action.payload,
            };
        default: return state;
    }
};

export default reducer;