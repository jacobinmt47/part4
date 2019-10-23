const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogHelper = require('./blog_helper')

const api = supertest(app)

beforeEach(async () => {
  console.log('before delete many')
  await Blog.deleteMany({})
  // eslint-disable-next-line no-restricted-syntax
  for (const b of blogHelper) {
  // console.log(b)
    const blogObject = new Blog(b)
    blogObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})

test('number of blogs', async () => {
  console.log('call for number of blogs')
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})

test('id is defined', async () => {
  console.log('called from id')
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})
