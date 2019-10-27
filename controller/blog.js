const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    console.log('called on get')
    const blg = await Blog.find({})
    // console.log(blg)
    if (blg) {
      console.log(`called on blg ${blg}`)
      response.json(blg.map(bl => bl.toJSON()))
    } else {
      console.log('called from error')
      response.status(404).end()
    }
  } catch (error) {
    console.log(`try catch error ${error}`)
  }
})

blogRouter.post('/', async (request, response, next) => {
  console.log('called on post')
  const { body } = request
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.title === '') {
    console.log('error title is blank')
    response.status(400).end()
    return 400
  }
  if (blog.url === undefined || blog.url === '') {
    console.log('error url is blank')
    response.status(400).end()
    return 400
  }
  try {
    const b = await blog.save()
    response.json(b)
  } catch (error) {
    console.log(`called from post error ${error}`)
    next(error)
  }
  return 0
})

blogRouter.delete('/:id', async (request, response, next) => {
  console.log('called on delete')
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  console.log('called on put --update value')
  const { body } = request
  console.log(`body from put ${body.likes}`)
  if (body === undefined) {
    response.status(400).end()
    return 400
  }
  const blg = {
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blg, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (error) {
    console.log(`error on put ${error}`)
    next(error)
  }
  return 0
})
blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})
module.exports = blogRouter
