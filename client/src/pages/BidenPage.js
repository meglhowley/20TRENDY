import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'

const BidenPage = (props) => {
  return (
    <div ref={props.bidenPageRef} className="page-section">
      <div>
        Nov 7: Biden President Elect Here.declare that Joe Biden has secured
        enough electoral college votes to win the presidency
      </div>
      <div
        onClick={() =>
          props.novemberPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next biden"
      >
        <DownArrowBlack />
      </div>
    </div>
  )
}

export default BidenPage
