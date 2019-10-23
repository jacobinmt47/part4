const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) =>{
  console.log('called on get')
  try {
    const blg = await Blog.find({})
    console.log('blg is found')
    if (blg) {
      console.log(`called on blg ${blg}`)
      response.json(blg)
    } else {
      console.log('called from error')
      response.status(404).end()
    }
  } catch (error) {
    console.log(`try catch error ${error}`)
  }
})

blogRouter.post('/', (request, response, next) => {
  console.log('called on post')
  const { body } = request
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  blog.save()
    .then(b => { response.json(b.toJSON())})
    .catch(error => { next(error) })
})

module.exports = blogRouter
