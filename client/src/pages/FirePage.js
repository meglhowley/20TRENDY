import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import kangaroo from '../animations/kangaroo.json'
import DownArrowWhite from '../components/DownArrowWhite'

const FirePage = (props) => {
  return (
    <div ref={props.firePageRef} className="page-section fires-div">
      <ScrollAnimation
        animateIn="animate__bounceIn"
        animateOut="animate__bounceOut"
        offset={150}
      >
        <div className="fire-text">
          February 1: One of the worst fire seasons in Australian history
          continues as thousands of people evacuate and millions of acres burn
        </div>
      </ScrollAnimation>
      <img
        className="fire-pic"
        src="https://i1.wp.com/emirateswoman.com/wp-content/uploads/2020/01/australia-bush-fires-donate.png?w=860&crop=0,0,100,430px"
      />
      {/* <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: kangaroo,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        isClickToPauseDisabled={true}
        height={350}
        width={350}
      /> */}
      <div
        onClick={() =>
          props.pandemicPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        className="next fires"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default FirePage
