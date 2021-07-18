import { useState, useEffect, useMemo } from 'react'
import Client from '../services'
import { Confetti } from 'react-confetti-cannon'

const MatchupQuiz = (props) => {
  // const [selectedFile, setSelectedFile] = useState('hi')

  const handleClickKW1 = (e) => {
    props.toggleDisableBtns(true)
    console.log(props.state.disableBtns)
    props.setQuizSelection(props.state.mainTrend.key_word_1)
    if (props.state.mainTrend.key_word_1 === props.state.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleClickKW2 = (e) => {
    props.toggleDisableBtns(true)
    props.setQuizSelection(props.state.mainTrend.key_word_2)
    if (props.state.mainTrend.key_word_2 === props.state.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  // const getFile = (e) => {
  //   let uploadedFile = e.target.files[0]
  //   setSelectedFile(uploadedFile)
  // }

  // const uploadFile = async () => {
  //   try {
  //     let fd = new FormData()
  //     fd.append('image', selectedFile)
  //     const res = await Client.post('/upload', fd)
  //     console.log(res.data)
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // const launchPoints = useMemo(
  //   () => [
  //     () => ({
  //       x: window.innerWidth / 2,
  //       y: window.innerHeight * 0.9,
  //       angle: 0
  //     })
  //   ],
  //   []
  // )

  // useEffect(() => {}, [selectedFile])

  return (
    <div className="quiz">
      <header>what was more searched in January 2020?</header>
      <div className="matchup-items">
        <button disabled={props.state.disableBtns} onClick={handleClickKW1}>
          {props.state.mainTrend.key_word_1}
        </button>
        <button disabled={props.state.disableBtns} onClick={handleClickKW2}>
          {props.state.mainTrend.key_word_2}
        </button>
      </div>
      {props.state.quizSelection ? (
        <div className="result">
          <h4>Test was boooooomin in January</h4>
        </div>
      ) : null}
    </div>
  )
}

export default MatchupQuiz
