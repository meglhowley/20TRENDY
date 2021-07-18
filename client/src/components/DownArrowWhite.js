import Lottie from 'react-lottie'
import whitenext from '../animations/whitenext.json'

const DownArrowWhite = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: whitenext,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
      isClickToPauseDisabled={true}
      height={50}
      width={50}
    />
  )
}

export default DownArrowWhite
