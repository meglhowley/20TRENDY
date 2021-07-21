import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'
import DownArrowWhite from '../components/DownArrowWhite'
import ReactPlayer from 'react-player'

const ActivitiesPage = (props) => {
  return (
    <div
      ref={props.activitiesPageRef}
      className="page-section activities-section"
    >
      <div className="text-no-shadow">
        Late March-April: As stay-at-home orders continue, people take to other
        means to connect with one another remotely.
      </div>
      <br />
      <ReactPlayer
        width="50%"
        height="50%"
        url="https://www.youtube.com/watch?v=EgpJekP261E"
      />
      <br />
      <div className="t-pain">
        [T. Pain opens his island to the public for tours]
      </div>
      <div
        onClick={() =>
          props.aprilPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        className="next activities"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default ActivitiesPage
