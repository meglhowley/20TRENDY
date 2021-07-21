import {
  PostTrend,
  UpdateTrend,
  DeleteTrend,
  GetTrendsByDate
} from '../../services/TrendService'

import {
  UPDATE_TREND_JAN,
  UPDATE_TREND_APR,
  UPDATE_TREND_JUN,
  UPDATE_TREND_NOV,
  DELETE_TREND,
  GET_TRENDS_BY_DATE_JAN,
  GET_TRENDS_BY_DATE_APR,
  GET_TRENDS_BY_DATE_JUN,
  GET_TRENDS_BY_DATE_NOV,
  SET_KEY_WORD_1,
  SET_KEY_WORD_2,
  SET_USER_CHART_DATA,
  TOGGLE_PENDING_CHART,
  SET_QUIZ_SELECTION,
  TOGGLE_EDIT_KW1,
  TOGGLE_EDIT_KW2,
  SET_RELATED,
  POST_TREND_JAN,
  POST_TREND_APR,
  POST_TREND_JUN,
  POST_TREND_NOV
} from '../types'

export const FetchTrendsByDateJan = (timeFrame) => {
  return async (dispatch) => {
    try {
      const res = await GetTrendsByDate(timeFrame)
      dispatch({ type: GET_TRENDS_BY_DATE_JAN, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const CreateTrendJan = (body) => {
  return async (dispatch) => {
    try {
      const res = await PostTrend(body)
      dispatch({ type: POST_TREND_JAN, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const EditUserTrendJan = (id, body) => {
  return async (dispatch) => {
    try {
      const res = await UpdateTrend(id, body)
      dispatch({ type: UPDATE_TREND_JAN, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const EditUserTrendApr = (id, body) => {
  return async (dispatch) => {
    try {
      const res = await UpdateTrend(id, body)
      dispatch({ type: UPDATE_TREND_APR, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const EditUserTrendJun = (id, body) => {
  return async (dispatch) => {
    try {
      const res = await UpdateTrend(id, body)
      dispatch({ type: UPDATE_TREND_JUN, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const EditUserTrendNov = (id, body) => {
  return async (dispatch) => {
    try {
      const res = await UpdateTrend(id, body)
      dispatch({ type: UPDATE_TREND_NOV, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const RemoveTrend = (id) => {
  return async (dispatch) => {
    try {
      const res = await DeleteTrend(id)
      console.log(res.data)
      dispatch({ type: DELETE_TREND, payload: res.data })
    } catch (error) {
      throw error
    }
  }
}

export const FetchTrendsByDateApr = (timeFrame) => {
  return async (dispatch) => {
    try {
      const res = await GetTrendsByDate(timeFrame)
      dispatch({ type: GET_TRENDS_BY_DATE_APR, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const FetchTrendsByDateJun = (timeFrame) => {
  return async (dispatch) => {
    try {
      const res = await GetTrendsByDate(timeFrame)
      dispatch({ type: GET_TRENDS_BY_DATE_JUN, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const CreateTrendApr = (body) => {
  return async (dispatch) => {
    try {
      const res = await PostTrend(body)
      dispatch({ type: POST_TREND_APR, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const CreateTrendJun = (body) => {
  return async (dispatch) => {
    try {
      const res = await PostTrend(body)
      dispatch({ type: POST_TREND_JUN, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const CreateTrendNov = (body) => {
  return async (dispatch) => {
    try {
      const res = await PostTrend(body)
      dispatch({ type: POST_TREND_NOV, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const FetchTrendsByDateNov = (timeFrame) => {
  return async (dispatch) => {
    try {
      const res = await GetTrendsByDate(timeFrame)
      dispatch({ type: GET_TRENDS_BY_DATE_NOV, payload: res })
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

export const TogglePendingChart = (boolean) => ({
  type: TOGGLE_PENDING_CHART,
  payload: boolean
})

export const SetQuizSelection = (keyword) => ({
  type: SET_QUIZ_SELECTION,
  payload: keyword
})

export const ToggleEditKW1 = (boolean) => ({
  type: TOGGLE_EDIT_KW1,
  payload: boolean
})

export const ToggleEditKW2 = (boolean) => ({
  type: TOGGLE_EDIT_KW2,
  payload: boolean
})

export const SetRelated = (array) => ({
  type: SET_RELATED,
  payload: array
})
