import {useState} from "react"

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = (props) => {

  if (!props.all) {
    return <>No feedback given</>
  }
  return (
  <table>
    <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </tbody>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAll ] = useState([])

  const handleGood = (newValue) => {
    setGood(newValue)
    setAll((allReviews.concat(1)))
  }
  const handleNeutral = (newValue) => {
    setNeutral(newValue)
    setAll((allReviews.concat(0)))
  }
  const handleBad = (newValue) => {
    setBad(newValue)
    console.log(newValue)
    setAll((allReviews.concat(-1)))
  }
  const average = () => {
    let sum = 0
    allReviews.forEach(value => {
      sum += value
    })
    return sum / allReviews.length
  }
  const positive = () => {
    let positive = 0
    allReviews.forEach(value => {
      if (value > 0) {
        positive += 1
      }
    })
    return positive / allReviews.length * 100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button onClick={() => handleGood(good + 1)} text="good"></Button>
        <Button onClick={() => handleNeutral(neutral + 1)}text="neutral"></Button>
        <Button onClick={() => handleBad(bad + 1)} text="bad"></Button>
      </p>
      <h1>statistics</h1>
      <p>
        <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
          all={allReviews.length}
          average={average()}
          positive={positive()}
        />
      </p>
    </div>
  )
}

export default App