import { SetQuizSelection } from "../store/actions/TrendActions"



const MatchupQuiz= (props)=>{  
return(<div className="matchup-quiz">
<button>{props.mainTrend.key_word_1.toUpperCase()}</button>
<button>{props.mainTrend.key_word_2.toUpperCase()}</button>
 </div> )}

 export default MatchupQuiz

