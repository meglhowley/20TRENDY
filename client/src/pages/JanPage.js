import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  FetchTrendsByDateJan,
  CreateTrendJan,
  EditUserTrend,
  RemoveTrend,
  SetKeyWord1,
  SetKeyWord2,
  SetUserChartData,
  TogglePendingChart,
  ToggleEditKW1,
  ToggleEditKW2
} from '../store/actions/TrendActions'
import UserChart from '../components/UserChart'
import MatchupQuiz from '../components/MatchupQuiz'
import TrendForm from '../components/TrendForm'
import loading from '../animations/loading.json'
import trending from '../animations/trending.json'
import Lottie from 'react-lottie'
import UserKeyWords from '../components/UserKeyWords'
import DownArrowBlack from '../components/DownArrowBlack'

const mapStateToProps = ({ janState }) => {
  return { janState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendsByDate: (date) => dispatch(FetchTrendsByDateJan(date)),
    createTrend: (body) => dispatch(CreateTrendJan(body)),
    editUserTrend: (id, body) => dispatch(EditUserTrend(id, body)),
    removeTrend: (id) => dispatch(RemoveTrend(id)),
    setKeyWord1: (body) => dispatch(SetKeyWord1(body)),
    setKeyWord2: (body) => dispatch(SetKeyWord2(body)),
    setUserChartData: (body) => dispatch(SetUserChartData(body)),
    togglePendingChart: (boolean) => dispatch(TogglePendingChart(boolean)),
    toggleEditKW1: (boolean) => dispatch(ToggleEditKW1(boolean)),
    toggleEditKW2: (boolean) => dispatch(ToggleEditKW2(boolean))
  }
}

const JanPage = (props) => {
  const {
    janState,
    fetchTrendsByDate,
    createTrend,
    editUserTrend,
    removeTrend,
    setKeyWord1,
    setKeyWord2,
    setUserChartData,
    togglePendingChart,
    toggleEditKW1,
    toggleEditKW2,
    janPageRef,
    firePageRef
  } = props

  const [disableBtns, toggleDisableBtns] = useState(false)
  const [quizSelection, setQuizSelection] = useState(false)
  const [inquiry, setInquiry] = useState(
    'Quiz! In January of 2020, which of the below was searched the most globally?'
  )
  const [answer, setAnswer] = useState(
    "It's hard to imagine a world where coronavirus was not a household term, but the world's love for Kobe was echoed around the world after his fatal helicopter crash."
  )

  const userQuery = useRef()

  const handleChangeKW1 = (e) => {
    setKeyWord1(e.target.value)
  }

  const handleChangeKW2 = (e) => {
    setKeyWord2(e.target.value)
  }

  const populateData = (userTrend) => {
    if (!userTrend) {
      return
    }
    let data = []
    let day = 0
    let trendArr1 = userTrend.trend_kw_1.split(' ')
    let trendArr2 = userTrend.trend_kw_2.split(' ')
    for (let i = 0; i < trendArr1.length; i++) {
      day += 1
      let dict = {}
      dict['name'] = `1/${day}`
      dict[`${userTrend.key_word_1}`] = parseInt(trendArr1[i])
      dict[`${userTrend.key_word_2}`] = parseInt(trendArr2[i])
      data.push(dict)
    }
    setUserChartData(data)
  }

  const handleSubmit = (e) => {
    togglePendingChart(true)
    e.preventDefault()
    createTrend({
      time_frame: '2020-01-01 2020-01-31',
      key_word_1: janState.keyWord1,
      key_word_2: janState.keyWord2
    })
    setKeyWord1('')
    setKeyWord2('')
  }

  const handleClickKW1 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(janState.mainTrend.key_word_1)
    if (janState.mainTrend.key_word_1 === janState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleClickKW2 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(janState.mainTrend.key_word_2)
    if (janState.mainTrend.key_word_2 === janState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleEditClicked1 = () => {
    toggleEditKW1(true)
    setKeyWord1(janState.userTrend.key_word_1)
  }

  const handleEditClicked2 = () => {
    toggleEditKW2(true)
    setKeyWord2(janState.userTrend.key_word_2)
  }

  const handleEditKW1 = (e) => {
    toggleEditKW1(false)
    togglePendingChart(true)
    editUserTrend(janState.userTrend.id, {
      key_word_1: janState.keyWord1,
      key_word_2: janState.userTrend.key_word_2,
      time_frame: '2020-01-01 2020-01-31'
    })
  }

  const handleEditKW2 = (e) => {
    toggleEditKW2(false)
    togglePendingChart(true)
    editUserTrend(janState.userTrend.id, {
      key_word_1: janState.userTrend.key_word_1,
      key_word_2: janState.keyWord2,
      time_frame: '2020-01-01 2020-01-31'
    })
  }

  const handleDelete = (e) => {
    removeTrend(janState.userTrend.id)
  }

  const handleAfterQuiz = () => {}

  useEffect(() => {
    fetchTrendsByDate('2020-01-01 2020-01-31')
  }, [])

  useEffect(() => {
    populateData(janState.userTrend)
    togglePendingChart(false)
  }, [janState.userTrend])

  return (
    <div>
      <div ref={janPageRef} className="jan-section">
        <MatchupQuiz
          state={janState}
          inquiry={inquiry}
          answer={answer}
          disableBtns={disableBtns}
          handleClickKW1={handleClickKW1}
          handleClickKW2={handleClickKW2}
          quizSelection={quizSelection}
        />
        <div
          onClick={() =>
            userQuery.current.scrollIntoView({ behavior: 'smooth' })
          }
          className="next janquiz"
        >
          <DownArrowBlack />
        </div>
      </div>
      <div ref={userQuery} className="jan-section">
        {!janState.userTrend ? (
          <div className="create-trend-div">
            <TrendForm
              handleSubmit={handleSubmit}
              state={janState}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
          </div>
        ) : null}
        {janState.userTrend ? (
          <div>
            <button className="clear-matchup" onClick={handleDelete}>
              Clear Matchup
            </button>
            <UserKeyWords
              state={janState}
              handleEditKW1={handleEditKW1}
              handleEditKW2={handleEditKW2}
              handleEditClicked1={handleEditClicked1}
              handleEditClicked2={handleEditClicked2}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
            <div className="clear"></div>
            <div>
              {console.log(janState.pendingChart)}
              {janState.pendingChart ? (
                <div className="data-container">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: loading,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                      }
                    }}
                    isClickToPauseDisabled={true}
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                <div className="data-container">
                  <UserChart
                    userTrend={janState.userTrend}
                    setUserChartData={setUserChartData}
                    userChartData={janState.userChartData}
                  />
                </div>
              )}
            </div>
            <div className="clear">
              <h4>People all searched for:</h4>
              <div className="snacks-container">
                {!janState.pendingChart
                  ? janState.userTrend.related
                      .split(' ')
                      .map((phrase, index) => {
                        return (
                          <div>
                            <div
                              style={{
                                backgroundColor:
                                  index === 0
                                    ? 'tomato'
                                    : index === 1
                                    ? '#de6ce0'
                                    : index === 2
                                    ? '#ebb134'
                                    : index === 3
                                    ? '#c6eb34'
                                    : index === 4
                                    ? '#6c98e0'
                                    : index === 5
                                    ? '#8f6ce0'
                                    : index === 6
                                    ? '#a6a05b'
                                    : index === 7
                                    ? 'thistle'
                                    : index === 8
                                    ? '#690325'
                                    : 'navy'
                              }}
                              className="related-div animate__animated animate__tada"
                            >
                              {phrase}
                            </div>
                          </div>
                        )
                      })
                  : null}
              </div>
            </div>
          </div>
        ) : janState.pendingChart ? (
          <div className="data-container">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loading,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              isClickToPauseDisabled={true}
              height={50}
              width={50}
            />
          </div>
        ) : (
          <div className="data-container">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: trending,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              isClickToPauseDisabled={true}
              height={300}
              width={300}
            />
            <h2>Explore what was trending in January 2020</h2>
          </div>
        )}
        <div
          onClick={() =>
            firePageRef.current.scrollIntoView({ behavior: 'smooth' })
          }
          className="next janpage"
        >
          <DownArrowBlack />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(JanPage)
