import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'
import DownArrowWhite from '../components/DownArrowWhite'

const BLMPage = (props) => {
  return (
    <div ref={props.BLMPageRef} className="page-section blm-section">
      <div>
        May 25th: Minneapolis police officer is filmed while pressing his knee
        on the neck of George Floyd <br />
        for eight minutes and 46 seconds, killing him, as three other officers
        stand by failing to intervene.
      </div>
      <div
        onClick={() =>
          props.protestsPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next BLM"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default BLMPage
