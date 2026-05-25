import axios from 'axios'
import phonenumberService from './services/phonenumbers'
import { useState, useEffect } from 'react'

const Person = (props) => {
  return (
    <li>
      {props.person.name} {props.person.number}
      <Button onClick={() => props.removePerson(props.person.id)} text="delete"/>
    </li>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const Filter = (props) => {
  return (
    <form>
      filter shown with <input value={props.nameFilter} onChange={props.handleNameFilterChange} />
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map((person) => (
        <Person key={person.name} person={person} removePerson={props.removePerson} id={person.id}/>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [nameFilter, setNameFilter] = useState('')

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )

  useEffect(() => {
    phonenumberService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      let message = `${newName} is already added to phonebook`
      alert(message)
      return
    }
    const person = {
      name: newName,
      number: newNumber,
    }
    phonenumberService
      .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
  }
  
  const removePerson = (id) => {
    const person = persons.find(person => person.id === id).name
    const message = `Delete ${person} ?`
    if (confirm(message)) {
      phonenumberService
        .remove(id)
          .then(() => {
            setPersons(
              persons.filter(person => person.id !== id)
            )
          })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    const input_string = event.target.value
    setNameFilter(input_string)
    if (input_string.length === 0) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App