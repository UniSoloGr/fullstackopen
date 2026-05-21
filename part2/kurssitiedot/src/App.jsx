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
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {props.parts.map(part =>
        <Part name={part.name} exercises={part.exercises} />
      )}
      <Total parts={props.parts} />
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

const Total = (props) => {
  return (
    <li style={{ fontWeight: 'bold' }}>
      total of {props.parts.map(part => part.exercises).reduce((totalExercises, exercise) => totalExercises + exercise, 0)} exercises
    </li>
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