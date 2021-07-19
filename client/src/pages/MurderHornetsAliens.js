import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'

const MurderHornetsPage = (props) => {
  return (
    <div ref={props.murderHornetsPageRef} className="page-section">
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
