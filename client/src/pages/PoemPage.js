import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import whitenext from '../animations/whitenext.json'

const PoemPage = (props) => {
  return (
    <div ref={props.poemPageRef} className="page-section">
      <div className="text">
        “What if 2020 isn’t cancelled?⁣
        <br />
        What if 2020 is the year we’ve been waiting for?⁣ <br />
        A year so uncomfortable, so painful, so scary, so raw — that it finally
        forces us to grow.⁣ <br />
        A year that screams so loud, finally awakening us from our ignorant
        slumber.⁣ <br />
        A year we finally accept the need for change.⁣ <br />
        Declare change. Work for change. Become the change. A year we finally
        band together, instead of⁣ pushing each other further apart.⁣
        <br />
        ⁣<br />
        2020 isn’t cancelled, but rather⁣
        <br />
        the most important year of them all.”⁣
        <br />
        ⁣-Leslie Dwight
      </div>
    </div>
  )
}

export default PoemPage
