require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "ValidationError") {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
}

const mongoUrl = process.env.MONGODB_URI
const database = mongoose.connect(mongoUrl, { family: 4 })
console.log(database)

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app