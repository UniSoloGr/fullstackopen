require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "ValidationError") {
        return response.status(400).json({
            error: error.message
        })
    }
}

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app