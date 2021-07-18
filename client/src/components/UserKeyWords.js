const UserKeyWords = (props) => {
  const {
    state,
    handleEditClicked1,
    handleEditClicked2,
    handleChangeKW1,
    handleChangeKW2,
    handleEditKW1,
    handleEditKW2
  } = props

  return (
    <div className="matchup-words">
      {!state.editKW1 ? (
        <div className="word-container">
          {state.userTrend.key_word_1}
          <button onClick={handleEditClicked1}>x</button>
        </div>
      ) : (
        <div className="word-container">
          <form className="edit-word-form" onSubmit={handleEditKW1}>
            <input
              onSubmit={handleEditKW1}
              value={state.keyWord1}
              onChange={handleChangeKW1}
            />
            <button onClick={handleEditKW1}>✓</button>
          </form>
        </div>
      )}
      {!state.editKW2 ? (
        <div className="word-container">
          {state.userTrend.key_word_2}
          <button onClick={handleEditClicked2}>x</button>
        </div>
      ) : (
        <div className="word-container">
          <form className="edit-word-form" onSubmit={handleEditKW2}>
            <input
              onSubmit={handleEditKW2}
              value={state.keyWord2}
              onChange={handleChangeKW2}
            />
            <button onClick={handleEditKW2}>✓</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default UserKeyWords
