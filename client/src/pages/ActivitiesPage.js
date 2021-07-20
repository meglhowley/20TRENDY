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
      <img
        className="tnook"
        src="https://c.tenor.com/Z0FK5nivytoAAAAj/animal-crossing-tom-nook.gif"
      />
      <div className="text-no-shadow">
        Late March-April: As stay-at-home orders continue, people take to other
        means to connect with one another remotely.
      </div>

      <br />
      <img className="animal-crossing" src="https://i.imgur.com/f8AvblC.png" />
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
