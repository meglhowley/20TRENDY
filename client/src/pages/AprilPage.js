import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  FetchTrendsByDateApr,
  CreateTrendApr,
  EditUserTrendApr,
  RemoveTrend,
  SetKeyWord1,
  SetKeyWord2,
  SetUserChartData,
  TogglePendingChart,
  SetQuizSelection,
  ToggleEditKW1,
  ToggleEditKW2
} from '../store/actions/TrendActions'
import UserChart from '../components/UserChart'
import MatchupQuiz from '../components/MatchupQuiz'
import TrendForm from '../components/TrendForm'
import loading from '../animations/loading.json'
import Lottie from 'react-lottie'
import UserKeyWords from '../components/UserKeyWords'
import DownArrowBlack from '../components/DownArrowBlack'

const mapStateToProps = ({ aprState }) => {
  return { aprState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendsByDate: (date) => dispatch(FetchTrendsByDateApr(date)),
    createTrend: (body) => dispatch(CreateTrendApr(body)),
    editUserTrend: (id, body) => dispatch(EditUserTrendApr(id, body)),
    removeTrend: (id) => dispatch(RemoveTrend(id)),
    setKeyWord1: (body) => dispatch(SetKeyWord1(body)),
    setKeyWord2: (body) => dispatch(SetKeyWord2(body)),
    setUserChartData: (body) => dispatch(SetUserChartData(body)),
    togglePendingChart: (boolean) => dispatch(TogglePendingChart(boolean)),
    toggleEditKW1: (boolean) => dispatch(ToggleEditKW1(boolean)),
    toggleEditKW2: (boolean) => dispatch(ToggleEditKW2(boolean))
  }
}

const AprPage = (props) => {
  const {
    aprState,
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
    'The rivalry of the decade: in April of 2020, who outnumbered who in global searches? 🐯 '
  )
  const [answer, setAnswer] = useState(
    'Hats off to Mr. Exotic, maybe next year Carole (killed her husband, whacked him).'
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
      dict['name'] = `4/${day}`
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
      time_frame: '2020-04-01 2020-04-30',
      key_word_1: aprState.keyWord1,
      key_word_2: aprState.keyWord2
    })
    setKeyWord1('')
    setKeyWord2('')
  }

  const handleClickKW1 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(aprState.mainTrend.key_word_1)
    if (aprState.mainTrend.key_word_1 === aprState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleClickKW2 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(aprState.mainTrend.key_word_2)
    if (aprState.mainTrend.key_word_2 === aprState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleEditClicked1 = () => {
    toggleEditKW1(true)
    setKeyWord1(aprState.userTrend.key_word_1)
  }

  const handleEditClicked2 = () => {
    toggleEditKW2(true)
    setKeyWord2(aprState.userTrend.key_word_2)
  }

  const handleEditKW1 = (e) => {
    toggleEditKW1(false)
    togglePendingChart(true)
    editUserTrend(aprState.userTrend.id, {
      key_word_1: aprState.keyWord1,
      key_word_2: aprState.userTrend.key_word_2,
      time_frame: '2020-04-01 2020-04-30'
    })
  }

  const handleEditKW2 = (e) => {
    toggleEditKW2(false)
    togglePendingChart(true)
    editUserTrend(aprState.userTrend.id, {
      key_word_1: aprState.userTrend.key_word_1,
      key_word_2: aprState.keyWord2,
      time_frame: '2020-04-01 2020-04-30'
    })
  }

  const handleDelete = (e) => {
    removeTrend(aprState.userTrend.id)
  }

  const handleAfterQuiz = () => {}

  useEffect(() => {
    fetchTrendsByDate('2020-04-01 2020-04-30')
  }, [])

  useEffect(() => {
    populateData(aprState.userTrend)
    togglePendingChart(false)
  }, [aprState.userTrend])

  return (
    <div>
      <div ref={props.aprilPageRef} className="jan-section">
        <MatchupQuiz
          state={aprState}
          disableBtns={disableBtns}
          inquiry={inquiry}
          answer={answer}
          handleClickKW1={handleClickKW1}
          handleClickKW2={handleClickKW2}
          quizSelection={quizSelection}
        />
        <div
          onClick={() =>
            userQuery.current.scrollIntoView({ behavior: 'smooth' })
          }
          className="next march-quiz"
        >
          <DownArrowBlack />
        </div>
      </div>
      <div ref={userQuery} className="jan-section">
        {!aprState.userTrend ? (
          <div className="create-trend-div">
            <TrendForm
              handleSubmit={handleSubmit}
              state={aprState}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
          </div>
        ) : null}
        {aprState.userTrend ? (
          <div className="full-container">
            <div className="clear-matchup">
              <button className="clear-matchup-btn" onClick={handleDelete}>
                Clear Matchup
              </button>
            </div>
            <UserKeyWords
              state={aprState}
              handleEditKW1={handleEditKW1}
              handleEditKW2={handleEditKW2}
              handleEditClicked1={handleEditClicked1}
              handleEditClicked2={handleEditClicked2}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
            <div>
              {console.log(aprState.pendingChart)}
              {aprState.pendingChart ? (
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
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <div className="data-container">
                  <UserChart
                    userTrend={aprState.userTrend}
                    setUserChartData={setUserChartData}
                    userChartData={aprState.userChartData}
                  />
                </div>
              )}
            </div>
            <div className="clear">
              <h4>People also searched for:</h4>
              <div className="snacks-container">
                {!aprState.pendingChart ? (
                  aprState.userTrend.related.split(' ').map((phrase, index) => {
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
                ) : (
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
                    height={100}
                    width={100}
                  />
                )}
              </div>
            </div>
          </div>
        ) : aprState.pendingChart ? (
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
              height={100}
              width={100}
            />
          </div>
        ) : (
          <div className="data-container">Search two words above!</div>
        )}
        <div
          onClick={() =>
            props.murderHornetsPageRef.current.scrollIntoView({
              behavior: 'smooth'
            })
          }
          className="next march-trend"
        >
          <DownArrowBlack />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AprPage)
