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

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapDispatchToProps= (dispatch) =>{
return{
  handleRegister: (body) => dispatch(HandleRegister(body)),
  handleLogin: (body) => dispatch(HandleLogin(body)),
  setAuthenticated: (boolean) => dispatch(SetAuthenticated(boolean)),
  setRegisterForm: (body) => dispatch(SetRegisterForm(body)),
  setLoginForm: (body) => dispatch(SetLoginForm(body)),
  toggleRegisterClicked: (boolean) => dispatch(ToggleRegisterClicked(boolean)),
  toggleLoginClicked: (boolean) => dispatch(ToggleLoginClicked(boolean))
}
}

const AuthPage= (props) => {
  const {
    authState,
    handleRegister,
    handleLogin,
    setAuthenticated,
    setRegisterForm,
    setLoginForm,
    toggleLoginClicked,
    toggleRegisterClicked
  } = props


  const getToken= ()=>{
    const token= localStorage.getItem('token')
    if (token) {
      return setAuthenticated(true)
    }
    }   

  const handleChangeRegister= (e) =>{
    const { name, value } = e.target
    setRegisterForm({ ...authState.registerForm, [name]: value })
    console.log(authState.registerForm)
  }

  const handleSubmitRegister= (e) =>{
    e.preventDefault()
    handleRegister(authState.registerForm)
  }

  const handleChangeLogin= (e) =>{
    const { name, value } = e.target
    setLoginForm({ ...authState.loginForm, [name]: value })
    console.log(authState.loginForm)
  }

  const handleSubmitLogin= (e) =>{
    e.preventDefault()
    handleLogin(authState.loginForm)
    getToken()
  }


  useEffect(() => {
    getToken()
  }, [])


if(!authState.registerClicked && !authState.loginClicked){
return(
<div className="auth-section">  <p>To continue to viewing experience, please:</p>
      <button onClick={()=>toggleRegisterClicked(true)}>Sign Up</button>
         or
          <button onClick={()=>toggleLoginClicked(true)}>Log In</button>
          </div>
)
}

if(authState.registerClicked){
  return(
  <div className="auth-section">
    <form onSubmit={handleSubmitRegister}>
       <input name="first_name" value={authState.registerForm.first_name}onChange={handleChangeRegister} placeholder="First Name"></input>
       <br />
       <input name="last_name" value={authState.registerForm.last_name} onChange={handleChangeRegister} placeholder="Last Name"></input>
       <br />
       <input name="email" value={authState.registerForm.email} onChange={handleChangeRegister} placeholder="Email"></input>
       <br />
       <input name="password" value={authState.registerForm.password} onChange={handleChangeRegister} placeholder="Create a Password"></input>
       <br />
       <input name="password" value={authState.registerForm.password} onChange={handleChangeRegister} placeholder="Confirm Password"></input>
       <br />
       <button>Submit</button>
     </form>
     <button onClick={()=>toggleRegisterClicked(false)}>Back</button>
     </div>)
    }

    if(authState.loginClicked){
      return(
      <div className="auth-section">
        <form onSubmit={handleSubmitLogin}>
           <input name="email" value={authState.loginForm.email} onChange={handleChangeLogin} placeholder="Email"></input>
           <br />
           <input name="password" value={authState.loginForm.password} onChange={handleChangeLogin} placeholder="Enter your Password"></input>
           <br />
           <button>Submit</button>
         </form>
         <button onClick={()=>toggleLoginClicked(false)}>Back</button>
         </div>)
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)

