import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'

const ActivitiesPage = (props) => {
  return (
    <div
      ref={props.activitiesPageRef}
      className="page-section activities-section"
    >
      <div className="text">
        Late March-April: As stay-at-home orders continue, people take to other
        means to connect with one another remotely.
      </div>
      <br />
      <div className="image-container">
        <img
          className="animal-crossing"
          src="https://attackofthefanboy.com/wp-content/uploads/2020/03/Animal-Crossing-New-Horizons-%E2%80%93-What-to-do-at-Night.jpg"
        />
      </div>
      <div
        onClick={() =>
          props.marchPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        className="next activities"
      >
        <DownArrowBlack />
      </div>
    </div>
  )
}

export default ActivitiesPage
