const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('correct amount of blogs is returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    
    assert.strictEqual(response.body.length, blogs.length)
})

test('the returned object\'s id is in the right format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body[0].id !== undefined, true)
})

test('new blog addition happens as expected', async () => {
    const title = "Addition happens as expected"
    const newBlog = {
        title: title,
        author: "me",
        likes: 10
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAfterAddition = await Blog.find({})
    
    assert.strictEqual(helper.initialBlogs.length + 1, blogsAfterAddition.length)
    assert.strictEqual(response.body.title, title)
})

test.only('empty like field defaults to 0', async () => {
    const title = "zero likes"
    const newBlog = {
        title: title,
        author: "me"
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAfterAddition = await Blog.find({})
    
    assert.strictEqual(response.body.likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})