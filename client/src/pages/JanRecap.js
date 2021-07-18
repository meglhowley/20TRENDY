import ScrollAnimation from 'react-animate-on-scroll'
import DownArrowWhite from '../components/DownArrowWhite'

const JanRecap = (props) => {
  return (
    <div ref={props.janRecapRef} className="jan-recap-section">
      <ScrollAnimation
        animateIn="animate__fadeInDown"
        animateOut="animate__fadeOutUp"
        offset={250}
      >
        <div className="text">
          Dec 31, 2019 "Pneumonia of Unknown Cause" Cluster in Wuhan, China
          reported by the World Health Organization.
        </div>
      </ScrollAnimation>
      <div
        onClick={() =>
          props.travelPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        className="next janrecap"
      >
        {' '}
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default JanRecap
