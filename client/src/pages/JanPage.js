import React, { useEffect } from 'react'
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
SetQuizSelection
} from '../store/actions/TrendActions'
import UserChart from '../components/UserChart'
import { ResponsiveContainer } from 'recharts'

const mapStateToProps = ({ janState }) => {
  return { janState }
}

const mapDispatchToProps= (dispatch) =>{
return{
  fetchTrendsByDate: (date) => dispatch(FetchTrendsByDate(date)),
  createTrend: (body) => dispatch(CreateTrend(body)),
  editUserTrend: (body) => dispatch(EditUserTrend(body)),
  removeTrend: (id) => dispatch(RemoveTrend(id)),
  setKeyWord1: (body) =>dispatch(SetKeyWord1(body)),
  setKeyWord2: (body) =>dispatch(SetKeyWord2(body)),
  setUserChartData: (body) => dispatch(SetUserChartData(body)),
  toggleUserTrendClicked: (body) => dispatch(ToggleUserTrendClicked(body)),
  setQuizSelection: (keyword) => dispatch(SetQuizSelection(keyword))
}
}

const JanPage= (props) => {
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
  setQuizSelection
  } = props


  const handleChangeKW1 = (e)=>{
    setKeyWord1(e.target.value)
  }

  const handleChangeKW2 = (e)=>{
    setKeyWord2(e.target.value)
  }

  const populateData= (userTrend) =>{
    if(!userTrend){
      return
    }
    let data= []
    let day=0
    let trendArr1= userTrend.trend_kw_1.split(" ")
    let trendArr2= userTrend.trend_kw_2.split(" ")
    for(let i=0; i<trendArr1.length; i++){
      day += 1
      let dict={}
      dict['name']= `1/${day}`
      dict[`${userTrend.key_word_1}`]= parseInt(trendArr1[i])
      dict[`${userTrend.key_word_2}`]= parseInt(trendArr2[i])
      data.push(dict)
    }
    setUserChartData(data)
    }


  const handleSubmit = (e) =>{
    e.preventDefault()
    createTrend({user_id: localStorage.getItem('user_id'),
    time_frame: "2020-01-01 2020-01-31",
    key_word_1: janState.keyWord1,
    key_word_2: janState.keyWord2})
    setKeyWord1('')
    setKeyWord2('')
  }

  const handleClickKW1 = (e)=>{
    setQuizSelection(janState.mainTrend.key_word_1)
    if(janState.mainTrend.key_word_1 === janState.mainTrend.winner){
      e.target.style.backgroundColor= "green"
    }else{
      e.target.style.backgroundColor= "red"
    }
  }

  const handleClickKW2 = (e)=>{
    setQuizSelection(janState.mainTrend.key_word_2)
    if(janState.mainTrend.key_word_2 === janState.mainTrend.winner){
      e.target.style.backgroundColor= "green"
    }else{
      e.target.style.backgroundColor= "red"
    }
  }
  

  useEffect(() => {
    fetchTrendsByDate("2020-01-01 2020-01-31")
  }, [])


  useEffect(() => {
    populateData(janState.userTrend)
  }, [janState.userTrend])


  if(janState.userTrendClicked){
    return(<div className="jan-section"><form onSubmit={handleSubmit}>
          DIY:<input name="key_word_1" value={janState.keyWord1} onChange={handleChangeKW1} placeholder="Word or Phrase 1"></input>
          vs.<input name="key_word_1" value={janState.keyWord2} onChange={handleChangeKW2} placeholder="Word or Phrase 2"></input>
          <button>go</button>
          </form>
          {janState.userTrend? (<div>{janState.userTrend.winner}<UserChart userTrend={janState.userTrend} setUserChartData={setUserChartData} userChartData={janState.userChartData}/></div>): (null)}
          <button onClick={()=>toggleUserTrendClicked(false)} >back</button></div>)
  }
      return(
      <div className="jan-section">
        What was more searched in January 2020?
        <div className="matchup-quiz">
        <button onClick={handleClickKW1}>{janState.mainTrend.key_word_1}</button>
        vs.
        <button onClick={handleClickKW2}>{janState.mainTrend.key_word_2}</button>
        </div>
        {janState.quizSelection? (<div><h4>Test was boooooomin in January</h4><button onClick={()=>toggleUserTrendClicked(true)}>Run your own matchup</button></div>) : (null)}
         </div>   
         )
        }


export default connect(mapStateToProps, mapDispatchToProps)(JanPage)
