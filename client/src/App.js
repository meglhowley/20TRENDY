import './App.css';
import AuthPage from './pages/AuthPage';
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {SetAuthenticated} from './store/actions/AuthActions'

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapDispatchToProps= (dispatch) =>{
return{
  setAuthenticated: (boolean) => dispatch(SetAuthenticated(boolean)),
}
}

function App(props) {
  const {
    authState,
    setAuthenticated
  } = props

  const getToken= ()=>{
    const token= localStorage.getItem('token')
    if (token) {
      setAuthenticated(true)
      console.log(authState.authenticated)
    }
    }   

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <div className="title-section">
      <div className="title">20<br/>&nbsp;&nbsp;20</div>
      <div className="bio">A Virtual Museum through the year that changed life as we've come to know it</div>
      </div>
      <AuthPage />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


