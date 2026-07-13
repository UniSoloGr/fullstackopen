const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

router.get('/check', async (req, res) => {
  res.send('<div>Checking that testing env works for E2E</div>')
})


module.exports = router