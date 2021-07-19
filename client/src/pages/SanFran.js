import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowBlack from '../components/DownArrowBlack'

const SanFranPage = (props) => {
  return (
    <div ref={props.sanFranPageRef} className="page-section">
      <div>
        Aug. 16: The SCU Lightning Complex fires start, affecting several Bay
        Area counties. Almost 400,000 acres are burned, making it the third
        largest wildfire in California history.
      </div>
      <div
        onClick={() =>
          props.RBGPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next san-fran"
      >
        <DownArrowBlack />
      </div>
    </div>
  )
}

export default SanFranPage
