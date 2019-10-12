const blogsRouter = require('express').Router()
// const Note = require('../models/note')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

 /* const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })
  */
   const blog = new Blog({
     title:body.title,
     author:body.author,
     url:body.url,
     likes: body.likes, 
   })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = notesRouter