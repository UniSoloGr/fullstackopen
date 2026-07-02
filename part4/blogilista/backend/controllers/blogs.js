const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  updatedBlog = await blog.save()
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter