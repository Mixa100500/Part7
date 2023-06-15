export const Anecdote = ({ anecdote }) => {
  const style = {
    marginTop: 25,
    marginBottom: 25
  }

  return(
    <div>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <div style={style}>has {anecdote.votes} votes</div>
      <div style={style}>for more information see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}