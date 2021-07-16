import ScrollAnimation from 'react-animate-on-scroll'

const JanRecap = () => {
  return (
    <div className="jan-recap-section">
      <ScrollAnimation
        animateIn="animate__fadeInDown"
        animateOut="animate__fadeOutUp"
        offset={250}
      >
        <div>
          Dec 31, 2019 "Pneumonia of Unknown Cause" Cluster in Wuhan, China
          reported by the World Health Organization.
        </div>
      </ScrollAnimation>
    </div>
  )
}

export default JanRecap
