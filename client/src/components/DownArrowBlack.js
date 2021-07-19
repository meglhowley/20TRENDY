import Lottie from 'react-lottie'
import next from '../animations/next.json'

const DownArrowBlack = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: next,
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

export default DownArrowBlack
