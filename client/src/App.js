import './App.css';
import AuthPage from './pages/AuthPage';
import JanPage from './pages/JanPage'
import JanRecap from './pages/JanRecap';
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {SetAuthenticated} from './store/actions/AuthActions'
import Lottie from "react-lottie";
import virus from './animations/virus.json'
import downarrow from './animations/downarrow.json'

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

  const authRef = useRef()

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
      <div className="bio">A virtual museum through the year that changed life as we know it</div>
      <div className="virus-animation"><Lottie options={{
    loop: true,
    autoplay: true,
    animationData: virus,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }} isClickToPauseDisabled={true} height={400} width={400}/></div>
  <div className="down-arrow">
  <Lottie options={{
    loop: true,
    autoplay: true,
    animationData: downarrow,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }} isClickToPauseDisabled={true} height={150} width={150}/>
  </div>
      </div>
      <AuthPage />
      <JanRecap />
      <JanPage />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

