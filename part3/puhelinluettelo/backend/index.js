require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

const apiPersons= "/api/persons"

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get(apiPersons, (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>${date.toString()}</p>
  `)
})

app.get(apiPersons + '/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post(apiPersons, (request, response) => {
  const errorMessage = (message) => {
    return response.status(400).json({
      error: `${message}`
    })
  }
  console.log("request", request)
  const body = request.body

  if (!body.name) {
    errorMessage(`name missing`)
  } else if (!body.number) {
    errorMessage('number missing')
  } 

  const person = new Person({
    name: body.name,
    number: body.number
  })

  console.log(body)

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

app.delete(apiPersons + '/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const generateId = (max) => {
  return Math.floor(Math.random() * max)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})