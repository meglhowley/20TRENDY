import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  HandleLogin,
  HandleRegister,
  SetAuthenticated,
  SetRegisterForm,
  SetLoginForm,
  ToggleRegisterClicked,
  ToggleLoginClicked
} from '../store/actions/AuthActions'
import 'animate.css/animate.min.css'
import ScrollAnimation from 'react-animate-on-scroll'

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister: (body) => dispatch(HandleRegister(body)),
    handleLogin: (body) => dispatch(HandleLogin(body)),
    setAuthenticated: (boolean) => dispatch(SetAuthenticated(boolean)),
    setRegisterForm: (body) => dispatch(SetRegisterForm(body)),
    setLoginForm: (body) => dispatch(SetLoginForm(body)),
    toggleRegisterClicked: (boolean) =>
      dispatch(ToggleRegisterClicked(boolean)),
    toggleLoginClicked: (boolean) => dispatch(ToggleLoginClicked(boolean))
  }
}

const AuthPage = (props) => {
  const {
    authState,
    handleRegister,
    handleLogin,
    setAuthenticated,
    setRegisterForm,
    setLoginForm,
    toggleLoginClicked,
    toggleRegisterClicked,
    authRef
  } = props

  const getToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      return setAuthenticated(true)
    }
  }

  const handleChangeRegister = (e) => {
    const { name, value } = e.target
    setRegisterForm({ ...authState.registerForm, [name]: value })
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    handleRegister(authState.registerForm)
  }

  const handleChangeLogin = (e) => {
    const { name, value } = e.target
    setLoginForm({ ...authState.loginForm, [name]: value })
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    handleLogin(authState.loginForm)
    getToken()
  }

  const logOut = () => {
    localStorage.clear()
    setAuthenticated(false)
  }

  useEffect(() => {
    getToken()
  }, [])

  if (!authState.registerClicked && !authState.loginClicked) {
    return (
      <div ref={props.authRef} className="auth-section">
        {' '}
        <p>
          To continue to viewing experience, <br />
          please sign up or log in: <br />
        </p>{' '}
        <div className="signup-login-btns">
          <ScrollAnimation animateIn="animate__fadeInLeft">
            <button onClick={() => toggleRegisterClicked(true)}>
              ◐ SIGN UP
            </button>
          </ScrollAnimation>
          <ScrollAnimation animateIn="animate__fadeInRight">
            <button onClick={() => toggleLoginClicked(true)}>◓ LOG IN</button>
          </ScrollAnimation>
        </div>
      </div>
    )
  }

  if (authState.registerClicked) {
    return (
      <div ref={props.authRef} className="auth-section">
        <div>Sign Up</div>
        <form onSubmit={handleSubmitRegister}>
          <input
            name="first_name"
            value={authState.registerForm.first_name}
            onChange={handleChangeRegister}
            placeholder="First Name"
          ></input>
          <br />
          <input
            name="last_name"
            value={authState.registerForm.last_name}
            onChange={handleChangeRegister}
            placeholder="Last Name"
          ></input>
          <br />
          <input
            name="email"
            value={authState.registerForm.email}
            onChange={handleChangeRegister}
            placeholder="Email"
          ></input>
          <br />
          <input
            name="password"
            value={authState.registerForm.password}
            onChange={handleChangeRegister}
            placeholder="Create a Password"
          ></input>
          <br />
          <input
            name="password"
            value={authState.registerForm.password}
            onChange={handleChangeRegister}
            placeholder="Confirm Password"
          ></input>
          <br />
        </form>
        <button onClick={handleSubmitRegister}>SUBMIT</button>
        <button onClick={() => toggleRegisterClicked(false)}>BACK</button>
        <button onClick={logOut}>Log out</button>
      </div>
    )
  }

  if (authState.loginClicked) {
    return (
      <div ref={props.authRef} className="auth-section">
        <div>Log In</div>
        <form onSubmit={handleSubmitLogin}>
          <input
            name="email"
            value={authState.loginForm.email}
            onChange={handleChangeLogin}
            placeholder="Email"
          ></input>
          <br />
          <input
            name="password"
            value={authState.loginForm.password}
            onChange={handleChangeLogin}
            placeholder="Enter your Password"
          ></input>
          <br />
          <button
            onClick={() =>
              props.janRecapRef.current.scrollIntoView({ behavior: 'smooth' })
            }
          >
            LOG IN
          </button>
        </form>
        <button onClick={() => toggleLoginClicked(false)}>BACK</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
