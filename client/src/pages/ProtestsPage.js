import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'

const ProtestsPage = (props) => {
  return (
    <div ref={props.protestsPageRef} className="page-section">
      <div>
        May 30th: A state of emergency is declared in Los Angeles County and
        city of Los Angeles because of protests over the death of George Floyd
        and racial injustice. Curfews are also declared in Philadelphia and
        Atlanta.
      </div>
      <div
        onClick={() =>
          props.junePageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next protests"
      >
        <DownArrowBlack />
      </div>
    </div>
  )
}

export default ProtestsPage
