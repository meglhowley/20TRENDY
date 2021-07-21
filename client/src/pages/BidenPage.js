import ScrollAnimation from 'react-animate-on-scroll'
import Lottie from 'react-lottie'
import essential from '../animations/essential.json'
import DownArrowWhite from '../components/DownArrowWhite'

const BidenPage = (props) => {
  return (
    <div ref={props.bidenPageRef} className="page-section biden-page">
      <div>
        Nov 7: After days of waiting, major news organizations declare that Joe
        Biden has secured enough electoral <br />
        college votes to win the presidency. Kamala Harris becomes first female,
        first black, and first Asian-American elected VP.
      </div>
      <img
        className="vote-gif"
        src="https://media0.giphy.com/media/55m7McmQ9tcD26kQ3I/giphy.gif"
      />
      <div
        onClick={() =>
          props.novemberPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next biden"
      >
        <DownArrowWhite />
      </div>
    </div>
  )
}

export default BidenPage
