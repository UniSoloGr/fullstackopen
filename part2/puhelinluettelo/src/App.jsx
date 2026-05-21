import { useState } from 'react'

const Person = (props) => {
  return (
    <li>
      {props.name}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      let message = `${newName} is already added to phonebook`
      alert(message)
      return
    }
    const person = {
      name: newName,
    }
    setPersons(persons.concat(person))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }



  console.log(persons)
  console.log(persons[0].name)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person name={person.name} />
        ))}
      </ul>
    </div>
  )

}

export default App