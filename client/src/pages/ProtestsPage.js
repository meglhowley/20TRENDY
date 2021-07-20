import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowWhite from '../components/DownArrowWhite'
import blm from '../animations/blm.json'

const ProtestsPage = (props) => {
  return (
    <div ref={props.protestsPageRef} className="page-section protests-section">
      <div>
        May 30th: A state of emergency is declared in Los Angeles County and
        city of Los Angeles because of protests over the death of George Floyd
        and racial injustice. Curfews are also declared in Philadelphia and
        Atlanta.
      </div>
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
