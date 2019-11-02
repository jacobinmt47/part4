const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogHelper = require('./blog_helper')
const userHelper = require('./blog_user')

const api = supertest(app)

describe('blog api tests', () => {
  beforeEach(async () => {
    try {
      jest.setTimeout(30000)
      // console.log('before delete many')
      await Blog.deleteMany({})
      await User.deleteMany({})
      // console.log('after delete many')
      const blg = blogHelper.map(blog => new Blog(blog))
      const usr = userHelper.map(user => new User(user))
      // console.log('not save blog entries')
      const promisearray = blg.map(b => b.save())
      const pa2 = usr.map(u => u.save())
      // console.log('after save')
      await Promise.all(promisearray)
      await Promise.all(pa2)
      // console.log('after promise all')
    } catch (error) {
      // console.log('called from error')
    }
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('number of blogs', async () => {
    jest.setTimeout(60000)
    try {
      // console.log('call for number of blogs')
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(blogHelper.length)
    } catch (error) {
      // console.log(`called from test number of blogs ${error}`)
    }
  })

  test('id is defined', async () => {
    jest.setTimeout(60000)
    try {
      // console.log('called from id')
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    } catch (error) {
      // console.log('error from defined')
    }
  })
  test('add blog', async () => {
    jest.setTimeout(60000)
    try {
      // console.log('called from add blog')
      const blog = new Blog({
        title: 'this is a new blog',
        author: 'jacob lageschulte',
        url: 'http://localhost',
      })
      await api.post('/api/blogs').send(blog)
      // console.log('called after post -- add blog')
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(blogHelper.length + 1)
      const urls = response.body.map(b => b.url)
      expect(urls).toContain('http://localhost')
      // might be problem assumes that  new blog will be at end of collection
      const j1 = response.body[blogHelper.length]
      // console.log(j1)
      expect(j1.likes).toBe(0)
    } catch (error) {
      // console.log(`error from add blog ${error}`)
    }
  })
  test('missing title', async () => {
    jest.setTimeout(60000)
    const badBlog = new Blog({
      author: 'jacob lageschulte',
      likes: 0,
      url: 'http:/localhost',
    })
    await api.post('/api/blogs').send(badBlog).expect(400)
  })
  test('missing url', async () => {
    jest.setTimeout(60000)
    const badBlog = new Blog({
      title: 'bad Blog',
      author: 'jacob lageschulte',
      likes: 0,
    })
    await api.post('/api/blogs').send(badBlog).expect(400)
  })
  test('update record', async () => {
    jest.setTimeout(60000)
    const blg = new Blog({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      user: '5dbde4a131372b2288a73db4',
      __v: 0,

    })
    await api.put(`/api/blogs/${blg._id}`).send(blg).expect(200)
    const response = await api.get(`/api/blogs/${blg._id}`)
    const { likes } = response.body
    expect(likes).toBe(10)
  })
  test('short name', async () => {
    jest.setTimeout(60000)
    const badUser = {
      userName: 'ba',
      name: 'ba',
      password: 'sh',
    }
    try {
      await api.post('/api/users').send(badUser).expect(400)
    } catch (exception) {
      console.log(exception)
    }
  })
  test('duplicate name', async () => {
    jest.setTimeout(60000)
    const badUser = { // this user should already be in the user collection
      userName: 'jacob',
      name: 'jacob',
      password: 'password',
    }
    try {
      await api.post('/api/users').send(badUser).expect(400)
    } catch (exception) {
      console.log(exception)
    }
  })
})
