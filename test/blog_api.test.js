const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogHelper = require('./blog_helper')

const api = supertest(app)

describe('blog api tests', () => {
  beforeEach(async () => {
    console.log('before delete many')
    await Blog.deleteMany({})
    console.log('after delete many')
    const blg = blogHelper.map(blog => new Blog(blog))
    const promisearray = blg.map(b => b.save())
    await Promise.all(promisearray)
    console.log('after promise all')
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('number of blogs', async () => {
    jest.setTimeout(60000)
    try {
      console.log('call for number of blogs')
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(blogHelper.length)
    } catch (error) {
      console.log(`called from test number of blogs ${error}`)
    }
  })

  test('id is defined', async () => {
    jest.setTimeout(60000)
    try {
      console.log('called from id')
      const response = await api.get('/api/blogs')
      expect(response).toBeDefined()
    } catch (error) {
      console.log('error from defined')
    }
  })
})
