import {
  PostTrend,
  UpdateTrend,
  DeleteTrend,
  GetTrendsByDate
 } from '../../services/TrendService'
 
 import {
   POST_TREND,
   UPDATE_TREND,
   DELETE_TREND,
   GET_TRENDS_BY_DATE,
   SET_KEY_WORD_1,
   SET_KEY_WORD_2,
   SET_USER_CHART_DATA,
   TOGGLE_USER_TREND_CLICKED
 } from '../types'

 export const FetchTrendsByDate= (timeFrame) =>{
  return async (dispatch) => {
    try {
      const res = await GetTrendsByDate(timeFrame)
      dispatch({ type: GET_TRENDS_BY_DATE, payload: res})
    } catch (error) {
      throw error
    }
  }
}

export const CreateTrend= (body) => {
  return async (dispatch) => {
    try {
      const res = await PostTrend(body)
      dispatch({ type: POST_TREND, payload: res})
    } catch (error) {
      throw error
    }
  }
}

export const EditUserTrend= (body) => {
  return async (dispatch) => {
    try {
      const res = await UpdateTrend(body)
      dispatch({ type: UPDATE_TREND, payload: res.data})
    } catch (error) {
      throw error
    }
  }
}

export const RemoveTrend= (id) => {
  return async (dispatch) => {
    try {
      const res = await DeleteTrend(id)
      console.log(res.data)
      dispatch({ type: DELETE_TREND, payload: res.data})
    } catch (error) {
      throw error
    }
  }
}

export const SetKeyWord1 = (body) => ({
  type: SET_KEY_WORD_1,
  payload: body
})

export const SetKeyWord2 = (body) => ({
  type: SET_KEY_WORD_2,
  payload: body
})

export const SetUserChartData = (body) => ({
  type: SET_USER_CHART_DATA,
  payload: body
})

export const ToggleUserTrendClicked = (boolean) => ({
  type: TOGGLE_USER_TREND_CLICKED,
  payload: boolean
})





