const TrendForm = (props) => {
  return (
    <form className="trend-form" onSubmit={props.handleSubmit}>
      <input
        name="key_word_1"
        value={props.state.keyWord1}
        onChange={props.handleChangeKW1}
        placeholder="Word or Phrase 1"
      />
      <input
        name="key_word_1"
        value={props.state.keyWord2}
        onChange={props.handleChangeKW2}
        placeholder="Word or Phrase 2"
      />
      <button className="go-btn">go</button>
    </form>
  )
}

export default TrendForm
