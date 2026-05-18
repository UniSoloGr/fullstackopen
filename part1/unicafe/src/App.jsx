import {useState} from "react"

const Statistics = (props) => {
  return (
    <>
      <li>good {props.good}</li>
      <li>neutral {props.neutral}</li>
      <li>bad {props.bad}</li>
      <li>all {props.all}</li>
      <li>average {props.average}</li>
      <li>positive {props.positive} %</li>
    </>
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
        <button onClick={() => handleGood(good + 1)}>good</button>
        <button onClick={() => handleNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => handleBad(bad + 1)}>bad</button>
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