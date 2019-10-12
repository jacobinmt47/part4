const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  console.log('called on get')
  Blog.find({})
    .then(blg => {
      if (blg) {
        response.json(blg.toJSON())
      }
      else {
        console.log('called from error')
        response.status(404).end()
      }
    })
})

blogRouter.post('/', (request, response, next) =>{
  console.log('called on post')
  const body = request.body
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
