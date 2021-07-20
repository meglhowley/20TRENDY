import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'
import hornets from '../animations/hornets.json'
import ufo from '../animations/ufo.json'

const MurderHornetsPage = (props) => {
  return (
    <div ref={props.murderHornetsPageRef} className="page-section hornets-ufo">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: ufo,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        isClickToPauseDisabled={true}
        height={350}
        width={350}
      />
      <div>May 3: Murder hornets and UFOs</div>
      <div
        onClick={() =>
          props.BLMPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next murder-hornets"
      >
        <DownArrowBlack />
      </div>
    </div>
  )
}

export default MurderHornetsPage
