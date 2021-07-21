import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowWhite from '../components/DownArrowWhite'
import blm from '../animations/blm.json'

const ProtestsPage = (props) => {
  return (
    <div ref={props.protestsPageRef} className="page-section protests-section">
      <div className="protests-div">
        May 30th: A state of emergency is declared across multiple cities
        including <br />
        Mineapolis, Los Angeles, and Portland as people across the country turn
        out to protest the murder of <br /> George Floyd and the fight against
        institutionalized racism in the US.
      </div>
      <br />
      <br />
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: blm,
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
          props.junePageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next protests"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default ProtestsPage
