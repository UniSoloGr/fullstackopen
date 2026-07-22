const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

const api = supertest(app)

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        const response = await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'raceer22',
            name: 'net raceer',
            password: 'you could never quess'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))

    })

    test('blog can be created and deleted, fails with empty credentials', async () => {
        const newUser = {
            username: 'raceer22',
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
        
        const token = loginResponse.body.token

        const newBlog = {
            title: "Addition happens as expected",
            author: "me",
            likes: 10,
            url: "9283iguah"
        }

        const response = await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(201)

        const blogId = response.body.id

        await api
            .delete(`/api/blogs/${blogId}`)
            .expect(401)

        await api
            .delete(`/api/blogs/${blogId}`)
            .auth(token, { type: 'bearer' })
            .expect(204)
    })

    test('duplpicate username causes an error', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            password: '132895'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert(response.body.error.includes('expected `username` to be unique'))
    })
})

after(async () => {
    await mongoose.connection.close()
})