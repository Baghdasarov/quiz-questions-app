// Import counter actions counter types helper
import { POINTS, ROUNDS, CURRENT_ROUND, HIGHEST_SCORE, CURRENT_QUESTIONS, CURRENT_QUESTIONS_OBJECT } from './profile.counter.types';
import {act} from "@testing-library/react";

// Initial state which will set redux values
const INITIAL_STATE = {
    currentRound: 1,
    points: 1,
    roundsLength: 30,
    highestScore: 0,
    currentQuestionsArray: [],
    currentQuestionObject: null
};

// Reducer variable holder
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case POINTS:
            if(action.payload.reset) {
                return {
                    ...state, points: 1,
                };
            } else {
                return {
                    ...state, points: state.points * 2,
                };
            }

        case ROUNDS:
            return {
                ...state, roundsLength: state.roundsLength + 1,
            };

        case CURRENT_ROUND:
            if(action.payload.reset) {
                return {
                    ...state, currentRound: 1
                }
            } else {
                return {
                    ...state, currentRound: state.currentRound + 1
                }
            }

        case HIGHEST_SCORE:
            return {
                ...state, highestScore: state.highestScore
            }

        case CURRENT_QUESTIONS:
            const k = state.currentQuestionsArray.push(action.payload)
             return {
                 ...state,
                 currentQuestionsArray: state.currentQuestionsArray,
                 currentQuestionObject: action.payload
             }
        default: return state;

    }

};

export default reducer;