import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'
import DownArrowWhite from '../components/DownArrowWhite'

const BLMPage = (props) => {
  return (
    <div ref={props.BLMPageRef} className="page-section blm-section">
      <div>May 25th: George Floyd (mention Breonna here)</div>
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
