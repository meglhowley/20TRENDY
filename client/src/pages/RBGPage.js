import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'

const RBGPage = (props) => {
  return (
    <div ref={props.RBGPageRef} className="page-section">
      <div>
        September 18: Long-serving Supreme Court Justice Ruth Bader Ginsburg
        dies at 87.
      </div>
      <div
        onClick={() =>
          props.bidenPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next rbg"
      >
        <DownArrowBlack />
      </div>
    </div>
  )
}

export default RBGPage
