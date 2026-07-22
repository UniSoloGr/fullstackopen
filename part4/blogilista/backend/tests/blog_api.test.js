const { test, after, beforeeach, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there\'s initially some blogs saved', () => {
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
})

describe("addition of a new blog", () => {
    let token

    beforeEach(async () => {
        User.deleteMany({})
        const newUser = {
            username: 'raceer',
            name: 'net raceer',
            password: 'you could never quess'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const loginResponse = await api
            .post('/api/login')
            .send({
                username: newUser.username,
                password: newUser.password
            })
        
        token = loginResponse.body.token
    })
    test('new blog addition happens as expected', async () => {
        const title = "Addition happens as expected"
        const newBlog = {
            title: title,
            author: "me",
            likes: 10,
            url: 'ewoitwoei'
        }
        const response = await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(201)

        const blogsAfterAddition = await Blog.find({})
        
        assert.strictEqual(helper.initialBlogs.length + 1, blogsAfterAddition.length)
        assert.strictEqual(response.body.title, title)
    })

    test('empty like field defaults to 0', async () => {
        const title = "zero likes"
        const newBlog = {
            title: title,
            author: "me",
            url: '3928523oli'
        }
        const response = await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(201)
        
        assert.strictEqual(response.body.likes, 0)
    })

    test('title and url are required', async () => {
        const newBlog = {
            author: "me"
        }
        const response = await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(400)
})
    test('addition of a new blog forbidden without token', async () => {
        const title = "Addition happens as expected"
        const newBlog = {
            title: title,
            author: "me",
            likes: 10,
            url: 'ewoitwoei'
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe("deletion of a blog", () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const ids = blogsAtEnd.map(n => n.id)
        assert(!ids.includes(blogToDelete.id))

        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
})

describe("modification of a blog", () => {
    test('succeeds with modification of a blog, if the id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]

        updatedBlog = {
            ...blogToModify,
            likes: blogToModify.likes + 10
        }
        const response = await api
            .put(`/api/blogs/${blogToModify.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const modifiedBlog = blogsAtEnd.find(blog => blog.id === blogToModify.id)

        assert.strictEqual(modifiedBlog.likes, updatedBlog.likes)
    })
})

after(async () => {
    await mongoose.connection.close()
})