import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  FetchTrendsByDateJun,
  CreateTrendJun,
  EditUserTrendJun,
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
import Lottie from 'react-lottie'
import UserKeyWords from '../components/UserKeyWords'
import DownArrowBlack from '../components/DownArrowBlack'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const mapStateToProps = ({ junState }) => {
  return { junState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendsByDate: (date) => dispatch(FetchTrendsByDateJun(date)),
    createTrend: (body) => dispatch(CreateTrendJun(body)),
    editUserTrend: (id, body) => dispatch(EditUserTrendJun(id, body)),
    removeTrend: (id) => dispatch(RemoveTrend(id)),
    setKeyWord1: (body) => dispatch(SetKeyWord1(body)),
    setKeyWord2: (body) => dispatch(SetKeyWord2(body)),
    setUserChartData: (body) => dispatch(SetUserChartData(body)),
    togglePendingChart: (boolean) => dispatch(TogglePendingChart(boolean)),
    toggleEditKW1: (boolean) => dispatch(ToggleEditKW1(boolean)),
    toggleEditKW2: (boolean) => dispatch(ToggleEditKW2(boolean))
  }
}

const JunePage = (props) => {
  const {
    junState,
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
    'In June of 2020, which of the below methods of support for BLM was trending more?'
  )
  const [answer, setAnswer] = useState(
    'People took to the streets globally. Polls estimate that between 15-26 million Americans marched in protest around the world, representing the largest grassroots protest in U.S. history.'
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
      dict['name'] = `6/${day}`
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
      time_frame: '2020-06-01 2020-06-30',
      key_word_1: junState.keyWord1,
      key_word_2: junState.keyWord2
    })
    setKeyWord1('')
    setKeyWord2('')
  }

  const handleClickKW1 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(junState.mainTrend.key_word_1)
    if (junState.mainTrend.key_word_1 === junState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleClickKW2 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(junState.mainTrend.key_word_2)
    if (junState.mainTrend.key_word_2 === junState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleEditClicked1 = () => {
    toggleEditKW1(true)
    setKeyWord1(junState.userTrend.key_word_1)
  }

  const handleEditClicked2 = () => {
    toggleEditKW2(true)
    setKeyWord2(junState.userTrend.key_word_2)
  }

  const handleEditKW1 = (e) => {
    toggleEditKW1(false)
    togglePendingChart(true)
    editUserTrend(junState.userTrend.id, {
      key_word_1: junState.keyWord1,
      key_word_2: junState.userTrend.key_word_2,
      time_frame: '2020-6-01 2020-06-30'
    })
  }

  const handleEditKW2 = (e) => {
    toggleEditKW2(false)
    togglePendingChart(true)
    editUserTrend(junState.userTrend.id, {
      key_word_1: junState.userTrend.key_word_1,
      key_word_2: junState.keyWord2,
      time_frame: '2020-6-01 2020-06-30'
    })
  }

  const handleDelete = (e) => {
    removeTrend(junState.userTrend.id)
  }

  const handleAfterQuiz = () => {}

  useEffect(() => {
    fetchTrendsByDate('2020-06-01 2020-06-30')
  }, [])

  useEffect(() => {
    populateData(junState.userTrend)
    togglePendingChart(false)
  }, [junState.userTrend])

  return (
    <div>
      <div ref={props.junePageRef} className="jan-section">
        <MatchupQuiz
          state={junState}
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
          className="next june-quiz"
        >
          <DownArrowBlack />
        </div>
      </div>
      <div ref={userQuery} className="jan-section">
        {!junState.userTrend ? (
          <div className="create-trend-div">
            <TrendForm
              handleSubmit={handleSubmit}
              state={junState}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
          </div>
        ) : null}
        {junState.userTrend ? (
          <div>
            <UserKeyWords
              state={junState}
              handleEditKW1={handleEditKW1}
              handleEditKW2={handleEditKW2}
              handleEditClicked1={handleEditClicked1}
              handleEditClicked2={handleEditClicked2}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
            <div className="clear">
              <button className="clear-matchup" onClick={handleDelete}>
                Clear Matchup
              </button>
            </div>
            <div>
              {console.log(junState.pendingChart)}
              {junState.pendingChart ? (
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
                    userTrend={junState.userTrend}
                    setUserChartData={setUserChartData}
                    userChartData={junState.userChartData}
                  />
                </div>
              )}
            </div>
            <div className="clear">
              <h4>People all searched for:</h4>
              <div className="snacks-container">
                {!junState.pendingChart
                  ? junState.userTrend.related
                      .split(' ')
                      .map((phrase, index) => {
                        return (
                          <div>
                            <div className="related-div animate__animated animate__tada">
                              {phrase}
                            </div>
                          </div>
                        )
                      })
                  : null}
              </div>
            </div>
          </div>
        ) : junState.pendingChart ? (
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
          <div className="data-container">Search two words above!</div>
        )}
        <div
          onClick={() =>
            props.sanFranPageRef.current.scrollIntoView({ behavior: 'smooth' })
          }
          className="next june-trend"
        >
          <DownArrowBlack />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(JunePage)
