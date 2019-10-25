const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    console.log('called on get')
    const blg = await Blog.find({})
    console.log(blg)
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
  try {
    const b = await blog.save()
    response.json(b)
  } catch (error) {
    console.log(`called from post error ${error}`)
    next(error)
  }
})

module.exports = blogRouter
