const express = require('express')
const app = express()

const apiPersons= "/api/persons"
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.use(express.json())
console.log(persons)

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get(apiPersons, (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date.toString()}</p>
  `)
})

app.get(apiPersons + '/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// app.delete(apiLink + '/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter(note => note.id !== id)

//   response.status(204).end()
// })

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

// app.post(apiLink, (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({
//       error: 'content missing'
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

// persons = persons.concat(note)

//   response.json(note)
// })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})