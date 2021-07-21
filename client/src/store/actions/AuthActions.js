import { Register, Login, ProtectedRoute } from '../../services/AuthService'

import {
  REGISTER,
  LOGIN,
  SET_AUTHENTICATED,
  SET_REGISTER_FORM,
  SET_LOGIN_FORM,
  TOGGLE_REGISTER_CLICKED,
  TOGGLE_LOGIN_CLICKED,
  SET_USER_ID,
  SET_ERROR_MSG
} from '../types'

export const SetProtectedRoute = () => {
  return async (dispatch) => {
    try {
      const res = await ProtectedRoute()
      dispatch({ type: SET_USER_ID, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const HandleRegister = (body) => {
  return async (dispatch) => {
    try {
      const res = await Register(body)
      dispatch({ type: REGISTER, payload: true })
    } catch (error) {
      dispatch({ type: SET_ERROR_MSG, payload: error })
    }
  }
}

export const HandleLogin = (body) => {
  return async (dispatch) => {
    try {
      const res = await Login(body)
      if (res.user) {
        localStorage.setItem('token', res.token)
        dispatch({ type: LOGIN, payload: { email: '', password: '' } })
        dispatch({ type: SET_ERROR_MSG, payload: '' })
        dispatch({ type: SET_AUTHENTICATED, payload: true })
      } else {
        dispatch({ type: SET_ERROR_MSG, payload: res })
      }
    } catch (error) {
      throw error
    }
  }
}

export const SetAuthenticated = (boolean) => ({
  type: SET_AUTHENTICATED,
  payload: boolean
})

export const SetRegisterForm = (body) => ({
  type: SET_REGISTER_FORM,
  payload: body
})

export const SetLoginForm = (body) => ({
  type: SET_LOGIN_FORM,
  payload: body
})

export const ToggleRegisterClicked = (boolean) => ({
  type: TOGGLE_REGISTER_CLICKED,
  payload: boolean
})

export const ToggleLoginClicked = (boolean) => ({
  type: TOGGLE_LOGIN_CLICKED,
  payload: boolean
})
