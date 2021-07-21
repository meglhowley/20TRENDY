import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import whitenext from '../animations/whitenext.json'
import flower from '../animations/flower.json'

const PoemPage = (props) => {
  return (
    <div>
      <div ref={props.poemPageRef} className="poem-section">
        <div className="poem">
          What if 2020 isn’t cancelled?⁣
          <br />
          What if 2020 is the year we’ve been waiting for?⁣ <br />
          A year so uncomfortable, so painful, so scary, so raw — <br />
          that it finally forces us to grow.⁣ <br />
          A year that screams so loud, finally <br />
          awakening us from our ignorant slumber.⁣ <br />
          A year we finally accept the need for change.⁣ <br />
          Declare change. Work for change. Become the change. <br />A year we
          finally band together, instead of⁣ pushing each other further apart.⁣
          <br />
          ⁣<br />
          2020 isn’t cancelled, but rather⁣
          <br />
          the most important year of them all.
          <br />
          <br />⁣<i>-Leslie Dwight</i>
        </div>
        <div>
          <img
            className="flower"
            src="https://64.media.tumblr.com/80e2ba523f88769790d292dc45e98984/tumblr_mwsxszrFlg1rm6jd7o1_r2_400.gifv"
          />
        </div>
      </div>
      <div className="btn-div">
        <button
          onClick={() =>
            props.homePageRef.current.scrollIntoView({
              behavior: 'smooth'
            })
          }
        >
          BACK TO TOP
        </button>
      </div>
      <footer>2021 Meg L. Howley™ </footer>
    </div>
  )
}

export default PoemPage
