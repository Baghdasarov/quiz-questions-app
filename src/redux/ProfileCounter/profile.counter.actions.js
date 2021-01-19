// Import action type
import { POINTS, ROUNDS, CURRENT_ROUND, CURRENT_QUESTIONS, CURRENT_QUESTIONS_OBJECT } from './profile.counter.types';

export const increasePoints = (context) => {

    return {
        type: POINTS,
        payload: context
    };
};

export const increaseRounds = () => {
    return {
        type: ROUNDS,
    };
};

export const increaseCurrentRound = (context) => {
    return {
        type: CURRENT_ROUND,
        payload: context
    }
}

export const addCurrentQuestionsIntoArray = (context) => {
    return {
        type: CURRENT_QUESTIONS,
        payload: context
    }
}

export const addCurrentQuestionsIntoObject = (context) => {
    return {
        type: CURRENT_QUESTIONS_OBJECT,
        payload: context
    }
}