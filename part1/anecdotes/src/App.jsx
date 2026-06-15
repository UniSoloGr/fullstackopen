import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  )
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  const getRandomIntInclusive = ({min, max}) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const increaseVote = (i) => {
    const copy = [ ...votes ]
    copy[i] += 1
    setVotes(copy)
    mostVotes(copy)
  }

  const mostVotes = (votesCopy) => {
    let maxIndex = 0
    for (let i = 0; i < votesCopy.length; i++) {
      if (votesCopy[i] > votesCopy[maxIndex]) {
        maxIndex = i
      }
    }
    setMostVotesIndex(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div/>
      has {votes[selected]} votes
      <div/>
      <button onClick={() => setSelected(getRandomIntInclusive({min:0, max:anecdotes.length - 1}))}>next anecdote</button>
      <button onClick={() => increaseVote(selected)}>vote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotesIndex]}
      <div/>
      has {votes[mostVotesIndex]} votes
    </div>
  )
}

export default App