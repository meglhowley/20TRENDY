import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  FetchTrendsByDateNov,
  CreateTrend,
  EditUserTrend,
  RemoveTrend,
  SetKeyWord1,
  SetKeyWord2,
  SetUserChartData,
  TogglePendingChart,
  SetQuizSelection,
  ToggleEditKW1,
  ToggleEditKW2,
  ToggleDisableBtns
} from '../store/actions/TrendActions'
import UserChart from '../components/UserChart'
import MatchupQuiz from '../components/MatchupQuiz'
import TrendForm from '../components/TrendForm'
import loading from '../animations/loading.json'
import Lottie from 'react-lottie'
import UserKeyWords from '../components/UserKeyWords'
import DownArrowBlack from '../components/DownArrowBlack'

const mapStateToProps = ({ novState }) => {
  return { novState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendsByDate: (date) => dispatch(FetchTrendsByDateNov(date)),
    createTrend: (body) => dispatch(CreateTrend(body)),
    editUserTrend: (id, body) => dispatch(EditUserTrend(id, body)),
    removeTrend: (id) => dispatch(RemoveTrend(id)),
    setKeyWord1: (body) => dispatch(SetKeyWord1(body)),
    setKeyWord2: (body) => dispatch(SetKeyWord2(body)),
    setUserChartData: (body) => dispatch(SetUserChartData(body)),
    togglePendingChart: (boolean) => dispatch(TogglePendingChart(boolean)),
    setQuizSelection: (keyword) => dispatch(SetQuizSelection(keyword)),
    toggleEditKW1: (boolean) => dispatch(ToggleEditKW1(boolean)),
    toggleEditKW2: (boolean) => dispatch(ToggleEditKW2(boolean)),
    toggleDisableBtns: (boolean) => dispatch(ToggleDisableBtns(boolean))
  }
}

const NovemberPage = (props) => {
  const {
    novState,
    fetchTrendsByDate,
    createTrend,
    editUserTrend,
    removeTrend,
    setKeyWord1,
    setKeyWord2,
    setUserChartData,
    togglePendingChart,
    setQuizSelection,
    toggleEditKW1,
    toggleEditKW2,
    toggleDisableBtns,
    janPageRef,
    firePageRef
  } = props

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
      time_frame: '2020-11-01 2020-11-30',
      key_word_1: novState.keyWord1,
      key_word_2: novState.keyWord2
    })
    setKeyWord1('')
    setKeyWord2('')
  }

  const handleClickKW1 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(novState.mainTrend.key_word_1)
    if (novState.mainTrend.key_word_1 === novState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleClickKW2 = (e) => {
    toggleDisableBtns(true)
    setQuizSelection(novState.mainTrend.key_word_2)
    if (novState.mainTrend.key_word_2 === novState.mainTrend.winner) {
      e.target.style.backgroundColor = '#c3f7ad'
    } else {
      e.target.style.backgroundColor = '#fa9191'
    }
  }

  const handleEditClicked1 = () => {
    toggleEditKW1(true)
    setKeyWord1(novState.userTrend.key_word_1)
  }

  const handleEditClicked2 = () => {
    toggleEditKW2(true)
    setKeyWord2(novState.userTrend.key_word_2)
  }

  const handleEditKW1 = (e) => {
    toggleEditKW1(false)
    togglePendingChart(true)
    editUserTrend(novState.userTrend.id, {
      key_word_1: novState.keyWord1,
      key_word_2: novState.userTrend.key_word_2,
      time_frame: '2020-11-01 2020-11-30'
    })
  }

  const handleEditKW2 = (e) => {
    toggleEditKW2(false)
    togglePendingChart(true)
    editUserTrend(novState.userTrend.id, {
      key_word_1: novState.userTrend.key_word_1,
      key_word_2: novState.keyWord2,
      time_frame: '2020-11-01 2020-11-30'
    })
  }

  const handleDelete = (e) => {
    removeTrend(novState.userTrend.id)
  }

  const handleAfterQuiz = () => {}

  useEffect(() => {
    fetchTrendsByDate('2020-11-01 2020-11-30')
  }, [])

  useEffect(() => {
    populateData(novState.userTrend)
    togglePendingChart(false)
  }, [novState.userTrend])

  return (
    <div>
      <div ref={props.novemberPageRef} className="jan-section">
        <MatchupQuiz
          state={novState}
          toggleDisableBtns={toggleDisableBtns}
          setQuizSelection={setQuizSelection}
        />
        <div
          onClick={() =>
            userQuery.current.scrollIntoView({ behavior: 'smooth' })
          }
          className="next nov-quiz"
        >
          <DownArrowBlack />
        </div>
      </div>
      <div ref={userQuery} className="jan-section">
        {!novState.userTrend ? (
          <div className="create-trend-div">
            <TrendForm
              handleSubmit={handleSubmit}
              state={novState}
              handleChangeKW1={handleChangeKW1}
              handleChangeKW2={handleChangeKW2}
            />
          </div>
        ) : null}
        {novState.userTrend ? (
          <div>
            <UserKeyWords
              state={novState}
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
              {console.log(novState.pendingChart)}
              {novState.pendingChart ? (
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
                    userTrend={novState.userTrend}
                    setUserChartData={setUserChartData}
                    userChartData={novState.userChartData}
                  />
                </div>
              )}
            </div>
            <div className="clear">
              <h4>People all searched for:</h4>
              <div className="snacks-container">
                {!novState.pendingChart
                  ? novState.userTrend.related
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
        ) : novState.pendingChart ? (
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
            props.contributePageRef.current.scrollIntoView({
              behavior: 'smooth'
            })
          }
          className="next nov-trend"
        >
          <DownArrowBlack />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NovemberPage)
