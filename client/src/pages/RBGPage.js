import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowWhite from '../components/DownArrowWhite'

const RBGPage = (props) => {
  return (
    <div ref={props.RBGPageRef} className="page-section rbg-section">
      <div>
        September 18: Long-serving Supreme Court Justice Ruth Bader Ginsburg
        dies at 87.
      </div>
      <img
        className="rbg-img"
        src="https://images.squarespace-cdn.com/content/v1/59e7a2c42aeba556d5b69c5d/1584258141827-4189EV1YV4R2O3SEEV0U/RBG-00.gif"
      />
      <div
        onClick={() =>
          props.bidenPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next rbg"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default RBGPage
