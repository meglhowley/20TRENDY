import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  FetchTrendsByDate,
  CreateTrend,
  EditUserTrend,
  RemoveTrend,
  SetKeyWord1,
  SetKeyWord2,
  SetUserChartData,
  ToggleUserTrendClicked,
  SetQuizSelection,
  ToggleEditKW1,
  ToggleEditKW2,
  ToggleDisableBtns
} from '../store/actions/TrendActions'
import UserChart from '../components/UserChart'
import MatchupQuiz from '../components/MatchupQuiz'

const mapStateToProps = ({ janState }) => {
  return { janState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendsByDate: (date) => dispatch(FetchTrendsByDate(date)),
    createTrend: (body) => dispatch(CreateTrend(body)),
    editUserTrend: (id, body) => dispatch(EditUserTrend(id, body)),
    removeTrend: (id) => dispatch(RemoveTrend(id)),
    setKeyWord1: (body) => dispatch(SetKeyWord1(body)),
    setKeyWord2: (body) => dispatch(SetKeyWord2(body)),
    setUserChartData: (body) => dispatch(SetUserChartData(body)),
    toggleUserTrendClicked: (body) => dispatch(ToggleUserTrendClicked(body)),
    setQuizSelection: (keyword) => dispatch(SetQuizSelection(keyword)),
    toggleEditKW1: (boolean) => dispatch(ToggleEditKW1(boolean)),
    toggleEditKW2: (boolean) => dispatch(ToggleEditKW2(boolean)),
    toggleDisableBtns: (boolean) => dispatch(ToggleDisableBtns(boolean))
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
    toggleUserTrendClicked,
    setQuizSelection,
    toggleEditKW1,
    toggleEditKW2,
    toggleDisableBtns
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
    console.log(janState.disableBtns)
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
    console.log(janState.userTrend)
  }

  const handleEditKW1 = (e) => {
    toggleEditKW1(false)
    editUserTrend(janState.userTrend.id, {
      key_word_1: janState.keyWord1,
      key_word_2: janState.userTrend.key_word_2,
      time_frame: '2020-01-01 2020-01-31'
    })
    setKeyWord1('')
  }

  const handleDelete = (e) => {
    console.log(janState.userTrend.id)
    removeTrend(janState.userTrend.id)
  }

  const handleAfterQuiz = () => {}

  useEffect(() => {
    fetchTrendsByDate('2020-01-01 2020-01-31')
  }, [])

  useEffect(() => {
    populateData(janState.userTrend)
  }, [janState.userTrend])

  return (
    <div>
      <div className="jan-section">
        <MatchupQuiz
          state={janState}
          toggleDisableBtns={toggleDisableBtns}
          setQuizSelection={setQuizSelection}
          toggleUserTrendClicked={toggleUserTrendClicked}
        />
        <button onClick={handleAfterQuiz}>Down</button>
      </div>
      <div ref={userQuery} className="jan-section">
        {!janState.userTrend ? (
          <form onSubmit={handleSubmit}>
            <input
              name="key_word_1"
              value={janState.keyWord1}
              onChange={handleChangeKW1}
              placeholder="Word or Phrase 1"
            />
            vs.
            <input
              name="key_word_1"
              value={janState.keyWord2}
              onChange={handleChangeKW2}
              placeholder="Word or Phrase 2"
            />
            <button>go</button>
          </form>
        ) : null}
        {janState.userTrend ? (
          <div>
            <div className="matchup-words">
              {!janState.editKW1 ? (
                <div className="matchup">
                  {janState.userTrend.key_word_1}
                  <button onClick={handleEditClicked1}>x</button>
                </div>
              ) : (
                <div className="matchup-words">
                  <input value={janState.keyWord1} onChange={handleChangeKW1} />
                  <button onClick={handleEditKW1}>✓</button>
                </div>
              )}
              <div className="matchup">
                {janState.userTrend.key_word_2}
                <button>x</button>
              </div>
            </div>
            <UserChart
              userTrend={janState.userTrend}
              setUserChartData={setUserChartData}
              userChartData={janState.userChartData}
            />
            <button onClick={handleDelete}>Delete Matchup</button>
          </div>
        ) : (
          'Search 2 words or phrases that were trending in January'
        )}
        <button onClick={() => toggleUserTrendClicked(false)}>back</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(JanPage)
