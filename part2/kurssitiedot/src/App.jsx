const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = (props) => {
  return (
    <li>
      {props.name} {props.exercises}
    </li>
  )
}

const Content = (props) => {
  return (
    <ul>
      {props.parts.map(part =>
        <Part name={part.name} exercises={part.exercises} />
      )}
    </ul>
  )
}

const Course = (props) => {
  return (
    <>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App