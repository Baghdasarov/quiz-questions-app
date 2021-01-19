// Import createStore
import { createStore } from 'redux';
// import reducer file
import rootReducer from './rootReducer';

// Hold state app
const store = createStore(rootReducer);


export default store;