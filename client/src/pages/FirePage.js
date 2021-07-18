import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import whitenext from '../animations/whitenext.json'

const FirePage = (props) => {
  return (
    <div className="page-section">
      <ScrollAnimation
        animateIn="animate__fadeInDown"
        animateOut="animate__fadeOutUp"
        offset={250}
      >
        <img
          className="australian-fires"
          src="https://static01.nyt.com/images/2020/01/31/world/10australialetter139-1/merlin_166536642_24b1e96c-327a-4b9c-9979-f87ed8a0b502-superJumbo.jpg"
        ></img>
      </ScrollAnimation>
    </div>
  )
}

export default FirePage
