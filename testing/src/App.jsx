import {useState} from "react"

const Button = (props) => {
  return (
  <button onClick={props.onClick} />
  )
}

const CompactButton = ({ onClick, text}) => <button onClick={onClick}></button>

const Counter = (props) => {
  return (
  <div>{props.counter} {props.name} </div>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app has not been initialized
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(" ")}
    </div>
  )
}

const App = () => {
  const [ left, setLeft ] = useState(0)
  const [ right , setRight ] = useState(0)
  const [ allClicks, setAll ] = useState([])
  const [ total, setTotal ] = useState(0)

  const handleLeftClick = (newLeft) => {
    setAll(allClicks.concat('L'))
    const updatedLeft = newLeft
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(updatedRight + left)
  }

  const setToValue = (newValue) => () => {
    setRight(newValue)
  }

  return (
    <div>
      left {left}
      <CompactButton onClick={() => handleLeftClick(left + 1)}> left </CompactButton>
      <CompactButton onClick={handleRightClick}> right </CompactButton>
      <CompactButton onClick={setToValue(1000)}> right </CompactButton>
      <button onClick={setToValue(0)}>set to 0</button>
      <button onClick={() => handleLeftClick(0)}>set left to 0</button>
      <button onClick={() => handleLeftClick(left + 1)}>left + 1</button>
      right {right}
      <History allClicks={allClicks} />
      <p>
        {total} : Total
      </p>
    </div>
  )
}

export default App