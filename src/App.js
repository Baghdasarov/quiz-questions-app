import React, { useRef,useState } from "react";
import './App.css';
import Button from './components/molecule/button'
import { Timer } from 'react-countdown-clock-timer'
import quiz from './Helpers/url'
import general from './Helpers/general'

// Import connect from redux
import { connect } from "react-redux"

import {
  increasePoints,
  increaseCurrentRound,
  addCurrentQuestionsIntoArray
} from "./redux/ProfileCounter/profile.counter.actions"

import {
  switchStart,
  switchRestart
} from "./redux/startGame/start.counter.actions"

function App(props) {
  // User answer input value ref
  const userInputAnswer = useRef(null);

  // Check answer event
  function handleCheckAnswer() {
    // Correct answer logic 3 - If the user gets an answer correct their score is incremented by the number of points for the current round and a new question is fetched and displayed
    let correctAnswer = props.currentQuestionObject.answer
    // Correct answer logic 2 - If the user gets an answer correct their score is incremented by the number of points for the current round and a new question is fetched and displayed
    let userAnswer = userInputAnswer.current.value

    // Correct answer logic 1 - If the user gets an answer correct their score is incremented by the number of points for the current round and a new question is fetched and displayed
    // Case sensitive - The answer should not be case sensitive
    if(userAnswer !== '' && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      props.increasePoints({reset: false})
      props.increaseCurrentRound({reset: false})
      getQuestion().then(response => {
        if(props.roundsLength > general.downTime) {
          // Maximum answers - The maximum number of rounds a user can complete is 30. After answering the 30th question a "You Won!" message and a restart button should be displayed to the user. The restart button behaves in the same way as the restart button displayed when the game is over.
          alert('You Won!')
          props.switchRestart(true)
          props.switchStart(false)
        } else {
          // Correct answer logic 4 - If the user gets an answer correct their score is incremented by the number of points for the current round and a new question is fetched and displayed
          // Reset timer
          props.switchStart(false)
          props.switchStart(true)
          props.addCurrentQuestionsIntoArray(response[response.length - 1])
        }
      }).catch(error => console.warn(error));

    } else {
      // Wrong answer - If the user gets an answer wrong then the correct answer, a "game over" message and a restart button should be displayed to the user
      alert('wrong answer')
      props.switchRestart(true)
      props.switchStart(false)
    }
  }

  function handleRestartGame() {
    // Restart game - If the user clicks the restart button then their points are reset to zero and the round is re-set to 1.
    props.increasePoints({reset: true})
    props.increaseCurrentRound({reset: true})
    props.switchStart(true)
    handleGetFirstQuestion()
  }

  const handleGetFirstQuestion = () => {
    getQuestion().then((response) => {
      props.addCurrentQuestionsIntoArray(response[response.length - 1])
    })
  }

  const getQuestion = () => {
    return fetch(quiz.random)
        .then(response => response.json())
        .catch(error => console.warn(error));
  }

  const handleFinish = () => {
    // game start process 3 - When an answer is displayed a timer is started. The user has 30 seconds to answer, otherwise the game is over (see details for an incorrect answer for how to handle this)
    // Game over becasue of time finsihed
    alert('game over')
    props.addCurrentQuestionsIntoArray(null)
    props.switchRestart(true)
    props.switchStart(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand text-dark" href="#">
                Quiz
            </a>
          </nav>
          <div className='App'>
            <div className="d-flex">
              <div className="col-md-5 mt-5">
                <span className="text-dark">Player Statistics:</span>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Current Round
                    <span className="badge badge-success badge-pill">{ props.currentRound }</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Current Round Point
                    <span className="badge badge-success badge-pill">{ props.points }</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Rounds
                    <span className="badge badge-success badge-pill">{ props.roundsLength }</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Highest Score
                    <span className="badge badge-success badge-pill">{ props.highestScore }</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-7 mt-5">
                {
                  props.start && (
                    <div className='timer-container'>
                      {/*Profile data - At all times the user's current score, the points for the current round, the time remaining and the user's high score should be displayed, along with the current question. The time remaining should be updated once per second*/}
                      {/*game start process 2 - When an answer is displayed a timer is started. The user has 30 seconds to answer, otherwise the game is over (see details for an incorrect answer for how to handle this)*/}
                      <h5 className="text-dark">
                        Timer
                      </h5>
                      <Timer
                          durationInSeconds={general.downTime}
                          formatted={true}
                          isPaused={!props.start}
                          onFinish={handleFinish}
                      />
                    </div>
                  )
                }
                { props.restart && !props.start && <Button styleName='btn-danger' onClick={ handleRestartGame } text="Restart game" /> }
                {
                  /* game start process 1 - When an answer is displayed a timer is started. The user has 30 seconds to answer, otherwise the game is over (see details for an incorrect answer for how to handle this) */
                  !props.start && !props.restart && (
                    <Button styleName='btn-success'
                            onClick={() => {
                              props.switchStart(true)
                              handleGetFirstQuestion()
                            }}
                            text="start game"
                    />
                  )
                }
                {
                  props.currentQuestionObject !== null && props.start &&
                    (
                      <div>
                        {/* Text of question json display requirement - The text of the question field and the category.title field should be displayed to the user. */}
                        <ul className="list-group mb-5">
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Question Category
                            <span className="badge badge-danger badge-pill">{ props.currentQuestionObject.category.title }</span>
                          </li>
                        </ul>
                        <div className="jumbotron">
                          <h5 className="display-4  text-success">
                            Question
                          </h5>
                          <p className="lead">
                            { props.currentQuestionObject.question }
                          </p>
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-6 col-center">
                              <form className="mb-5">
                                {/* add submit and input answer text - A text box and a submit button should be provided to allow the user to answer the question. */}
                                <div className="form-group">
                                  <label htmlFor="answer" className="text-dark">Answer</label>
                                  <input ref={ userInputAnswer } type="text" className="form-control" id="answer" autoFocus={false} />
                                </div>
                                <Button styleName='btn-success' onClick={handleCheckAnswer} text="submit answer" />
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentRound: state.profile.currentRound,
    points: state.profile.points,
    roundsLength: state.profile.roundsLength,
    highestScore: state.profile.highestScore,
    currentQuestionsArray: state.profile.currentQuestionsArray,
    currentQuestionObject: state.profile.currentQuestionObject,
    start: state.process.start,
    restart: state.process.restart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchStart: (boolyRestart) => dispatch(switchStart(boolyRestart)),
    switchRestart: (boolySwitch) => dispatch(switchRestart(boolySwitch)),
    increaseCurrentRound: (boolyArgument) => dispatch(increaseCurrentRound(boolyArgument)),
    addCurrentQuestionsIntoArray: (question) => dispatch(addCurrentQuestionsIntoArray(question)),
    increasePoints: (point) => dispatch(increasePoints(point)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
