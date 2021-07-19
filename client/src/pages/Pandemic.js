import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import DownArrowWhite from '../components/DownArrowWhite'
import essential from '../animations/essential.json'

const Pandemic = (props) => {
  return (
    <div ref={props.pandemicPageRef} className="page-section pandemic-order">
      {/* <ScrollAnimation
        animateIn="animate__bounceIn"
        animateOut="animate__bounceOut"
        offset={150}
      > */}
      <div className="text">
        March 11: The World Health Organization declares the coronavirus
        outbreak a pandemic. Companies across the US send employees home to work
        remotely, while essential workers expose themselves daily to the threat
        of the virus.
      </div>
      {/* </ScrollAnimation> */}
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: essential,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        isClickToPauseDisabled={true}
        height={350}
        width={350}
      />
      <div
        onClick={() =>
          props.activitiesPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        className="next pandemic"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default Pandemic
