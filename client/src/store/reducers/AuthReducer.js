const {
  REGISTER,
  LOGIN,
  SET_REGISTER_FORM,
  SET_LOGIN_FORM,
  TOGGLE_REGISTER_CLICKED,
  TOGGLE_LOGIN_CLICKED,
  SET_AUTHENTICATED,
  SET_ERROR_MSG
} = require('../types')

const iState = {
  authenticated: false,
  registerForm: {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  },
  loginForm: {
    email: '',
    password: ''
  },
  registered: false,
  registerClicked: false,
  loginClicked: false,
  errorMsg: ''
}

const AuthReducer = (state = iState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, registered: action.payload }
    case LOGIN:
      return { ...state, loginForm: action.payload }
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.payload }
    case SET_REGISTER_FORM:
      return { ...state, registerForm: action.payload }
    case SET_LOGIN_FORM:
      return { ...state, loginForm: action.payload }
    case TOGGLE_REGISTER_CLICKED:
      return { ...state, registerClicked: action.payload }
    case TOGGLE_LOGIN_CLICKED:
      return { ...state, loginClicked: action.payload }
    case SET_ERROR_MSG:
      return { ...state, errorMsg: action.payload }
    default:
      return { ...state }
  }
}

export default AuthReducer
