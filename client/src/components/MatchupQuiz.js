import { useState, useEffect, useMemo } from 'react'
import Client from '../services'

const MatchupQuiz = (props) => {
  useEffect(() => {
    console.log(props.disableBtns)
  }, [])

  return (
    <div className="quiz">
      <header>{props.inquiry}</header>
      <div className="matchup-items">
        <button disabled={props.disableBtns} onClick={props.handleClickKW1}>
          {props.state.mainTrend.key_word_1}
        </button>
        <button disabled={props.disableBtns} onClick={props.handleClickKW2}>
          {props.state.mainTrend.key_word_2}
        </button>
        {props.quizSelection ? (
          <div className="result">
            <h4>{props.answer}</h4>
          </div>
        ) : (
          <div className="result">
            <h4></h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchupQuiz
