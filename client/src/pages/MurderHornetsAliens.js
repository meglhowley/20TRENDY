import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowWhite from '../components/DownArrowWhite'
import hornets from '../animations/hornets.json'
import ufo from '../animations/ufo.json'

const MurderHornetsPage = (props) => {
  return (
    <div ref={props.murderHornetsPageRef} className="page-section hornets-ufo">
      <div className="ufo">
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
      </div>
      <div>
        April 27: the Pentagon releases UFO footage and confirms their
        existence. <br />
        May 3rd: Asian Giant 'Murder' Hornets invade the US.
      </div>
      <div
        onClick={() =>
          props.BLMPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next murder-hornets"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default MurderHornetsPage
