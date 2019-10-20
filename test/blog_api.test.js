const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogHelper = require('./blog_helper')

const api = supertest(app)

beforeEach(async () => {
  Blog.deleteMany({})
  // eslint-disable-next-line no-restricted-syntax
  for (const b of blogHelper) {
    const blogObject = new Blog(b)
    blogObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})

test('number of blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body.length)
  expect(response.body.length === 5)
})
