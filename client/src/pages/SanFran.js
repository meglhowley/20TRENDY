import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowWhite from '../components/DownArrowWhite'

const SanFranPage = (props) => {
  return (
    <div ref={props.sanFranPageRef} className="page-section san-fran-section">
      <div>
        Aug. 16: The SCU Lightning Complex fires start, affecting several Bay
        Area counties.
        <br />
        Almost 400,000 acres are burned, making it the third largest wildfire in
        California history.
      </div>
      <div
        onClick={() =>
          props.RBGPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next san-fran"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default SanFranPage
