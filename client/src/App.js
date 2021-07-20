import './App.css'
import AuthPage from './pages/AuthPage'
import JanPage from './pages/JanPage'
import JanRecap from './pages/JanRecap'
import MatchupQuiz from './components/MatchupQuiz'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { SetAuthenticated } from './store/actions/AuthActions'
import { GetAllPosts, SetUserLikes } from './store/actions/PostActions'
import Lottie from 'react-lottie'
import virus from './animations/virus.json'
import downarrow from './animations/downarrow.json'
import ContributePage from './pages/ContributePage'
import PoemPage from './pages/PoemPage'
import FirePage from './pages/FirePage'
import TravelPage from './pages/TravelPage'
import Pandemic from './pages/Pandemic'
import ActivitiesPage from './pages/ActivitiesPage'
import MurderHornetsPage from './pages/MurderHornetsAliens'
import BLMPage from './pages/BLMPage'
import AprilPage from './pages/AprilPage'
import SanFranPage from './pages/SanFran'
import RBGPage from './pages/RBGPage'
import JunePage from './pages/JunePage'
import ProtestsPage from './pages/ProtestsPage'
import BidenPage from './pages/BidenPage'
import NovemberPage from './pages/NovemberPage'

const mapStateToProps = ({ authState, janState, postState }) => {
  return { authState, janState, postState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: (boolean) => dispatch(SetAuthenticated(boolean)),
    getAllPosts: () => dispatch(GetAllPosts()),
    setUserLikes: () => dispatch(SetUserLikes())
  }
}

function App(props) {
  const {
    authState,
    janState,
    setAuthenticated,
    getAllPosts,
    postState,
    setUserLikes
  } = props

  const authRef = useRef()
  const janRecapRef = useRef()
  const janPageRef = useRef()
  const travelPageRef = useRef()
  const firePageRef = useRef()
  const pandemicPageRef = useRef()
  const activitiesPageRef = useRef()
  const aprilPageRef = useRef()
  const murderHornetsPageRef = useRef()
  const BLMPageRef = useRef()
  const protestsPageRef = useRef()
  const junePageRef = useRef()
  const sanFranPageRef = useRef()
  const RBGPageRef = useRef()
  const bidenPageRef = useRef()
  const novemberPageRef = useRef()
  const contributePageRef = useRef()
  const poemPageRef = useRef()

  const getToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthenticated(true)
    }
  }

  const scrollToAuth = () => {
    authRef.currenet.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    getToken()
    getAllPosts()
  }, [postState.posts.length])

  useEffect(() => {
    setUserLikes()
  }, [postState.userLikes.length])

  return (
    <div className="App">
      <div className="title-section">
        <div className="left">
          <div className="title">
            20
            <br />
            &nbsp;&nbsp;20
          </div>
        </div>
        <div className="right">
          <div className="bio">
            <h2>A Virtual Museum through the Internet of 2020</h2>
            <p>Powered by pyTrends</p>
            <button
              onClick={() =>
                authRef.current.scrollIntoView({ behavior: 'smooth' })
              }
              className="explore-btn"
            >
              EXPLORE NOW
            </button>
          </div>
          <div className="virus-animation">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: virus,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              isClickToPauseDisabled={true}
              height={400}
              width={400}
            />
          </div>
        </div>
      </div>
      <AuthPage authRef={authRef} janRecapRef={janRecapRef} />
      <JanRecap janRecapRef={janRecapRef} travelPageRef={travelPageRef} />
      <TravelPage travelPageRef={travelPageRef} janPageRef={janPageRef} />
      <JanPage janPageRef={janPageRef} firePageRef={firePageRef} />
      <FirePage firePageRef={firePageRef} pandemicPageRef={pandemicPageRef} />
      <Pandemic
        pandemicPageRef={pandemicPageRef}
        activitiesPageRef={activitiesPageRef}
      />
      <ActivitiesPage
        activitiesPageRef={activitiesPageRef}
        aprilPageRef={aprilPageRef}
      />
      <AprilPage
        aprilPageRef={aprilPageRef}
        murderHornetsPageRef={murderHornetsPageRef}
      />
      <MurderHornetsPage
        murderHornetsPageRef={murderHornetsPageRef}
        BLMPageRef={BLMPageRef}
      />
      <BLMPage BLMPageRef={BLMPageRef} protestsPageRef={protestsPageRef} />
      <ProtestsPage
        protestsPageRef={protestsPageRef}
        junePageRef={junePageRef}
      />
      <JunePage junePageRef={junePageRef} sanFranPageRef={sanFranPageRef} />
      <SanFranPage sanFranPageRef={sanFranPageRef} RBGPageRef={RBGPageRef} />
      <RBGPage RBGPageRef={RBGPageRef} bidenPageRef={bidenPageRef} />
      <BidenPage
        bidenPageRef={bidenPageRef}
        novemberPageRef={novemberPageRef}
      />
      <NovemberPage
        novemberPageRef={novemberPageRef}
        contributePageRef={contributePageRef}
      />
      <ContributePage
        contributePageRef={contributePageRef}
        poemPageRef={poemPageRef}
      />
      <PoemPage poemPageRef={poemPageRef} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
