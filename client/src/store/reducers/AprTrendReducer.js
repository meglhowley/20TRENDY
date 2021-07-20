const {
  POST_TREND,
  UPDATE_TREND,
  DELETE_TREND,
  GET_TRENDS_BY_DATE_APR,
  SET_KEY_WORD_1,
  SET_KEY_WORD_2,
  SET_USER_CHART_DATA,
  TOGGLE_PENDING_CHART,
  SET_QUIZ_SELECTION,
  TOGGLE_EDIT_KW1,
  TOGGLE_EDIT_KW2,
  TOGGLE_DISABLE_BTNS,
  SET_RELATED
} = require('../types')

const iState = {
  monthlyTrends: [],
  mainTrend: [],
  userTrend: null,
  keyWord1: '',
  keyWord2: '',
  userChartData: null,
  pendingChart: false,
  quizSelection: '',
  editKW1: false,
  editKW2: false,
  disableBtns: false,
  related: []
}

const AprTrendReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_TRENDS_BY_DATE_APR:
      return {
        ...state,
        monthlyTrends: action.payload,
        mainTrend: action.payload[0]
      }
    case POST_TREND:
      return {
        ...state,
        monthlyTrends: [...state.monthlyTrends, action.payload],
        userTrend: action.payload
      }
    case UPDATE_TREND:
      return {
        ...state,
        monthlyTrends: [...state.monthlyTrends, action.payload],
        userTrend: action.payload
      }
    case DELETE_TREND:
      const monthlyTrendsCopy = [...state.monthlyTrends]
      const filteredTrends = monthlyTrendsCopy.filter(
        (trend) => trend.id !== action.payload
      )
      return { ...state, monthlyTrends: filteredTrends, userTrend: null }
    case SET_KEY_WORD_1:
      return { ...state, keyWord1: action.payload }
    case SET_KEY_WORD_2:
      return { ...state, keyWord2: action.payload }
    case SET_USER_CHART_DATA:
      return { ...state, userChartData: action.payload }
    case TOGGLE_PENDING_CHART:
      return { ...state, pendingChart: action.payload }
    case SET_QUIZ_SELECTION:
      return { ...state, quizSelection: action.payload }
    case TOGGLE_EDIT_KW1:
      return { ...state, editKW1: action.payload }
    case TOGGLE_EDIT_KW2:
      return { ...state, editKW2: action.payload }
    case TOGGLE_DISABLE_BTNS:
      return { ...state, disableBtns: action.payload }
    default:
      return { ...state }
  }
}

export default AprTrendReducer
