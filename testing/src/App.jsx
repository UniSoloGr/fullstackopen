import {useState} from "react"

const Button = (props) => {
  return (
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const Counter = (props) => {
  return (
  <div>{props.counter}</div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Counter counter={counter} />
      <Button onClick={increaseByOne} text='+1' />
      <Button onClick={setToZero} text='0' />
    </div>
  )
}

export default App