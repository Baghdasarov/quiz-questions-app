// Import combineReduce to solve reduceers combine problem
import { combineReducers } from 'redux';

import profileStaisticsReducer from './ProfileCounter/profile.counter.reducer';
import gameProcess from './startGame/start.counter.reducer';

// Assign variable to combine reducers processs
const rootReducer = combineReducers({
    profile: profileStaisticsReducer,
    process:  gameProcess
});

export default rootReducer;