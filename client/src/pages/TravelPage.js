import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import plane from '../animations/plane.json'
import DownArrowWhite from '../components/DownArrowWhite'

const TravelPage = (props) => {
  return (
    <div ref={props.travelPageRef} className="page-section first-case">
      <ScrollAnimation
        animateIn="animate__fadeInLeft"
        animateOut="animate__fadeOutRight"
        offset={150}
      >
        <div className="text-no-shadow">
          <br />
          Jan 31, 2020: White House imposes travel restrictions from China
        </div>
      </ScrollAnimation>
      <div style={{ marginTop: '50px' }}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: plane,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          isClickToPauseDisabled={true}
          height={200}
          width={300}
        />
      </div>
      <div
        onClick={() =>
          props.janPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        className="next travel"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default TravelPage
