const lodash = require('lodash')

const dummy = (blogs) => 1
const gummy = () => 2
const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
  let i = 0
  let likeMax = 0
  let indexMax = 0
  for (;i < blogs.length; i += 1) {
    if (blogs[i].likes > likeMax) {
      likeMax = blogs[i].likes
      indexMax = i
    }
  }
  const b = {
    title: blogs[indexMax].title,
    author: blogs[indexMax].author,
    likes: blogs[indexMax].likes,
  }
  return b
}
const mostBlogs = (blogs) => {
// return author and number of blogs
  const a = lodash.countBy(blogs, 'author')
  const size = lodash.size(a)
  const p = lodash.toPairs(a)
  const mb = { // should i sort this first
    author: p[size - 1][0],
    blogs: p[size - 1][1],
  }
  return mb
}

const mostLikes = (blogs) => {
// return author and number of likes for the most liked
  let maxLike = 0
  let maxAuthor = ''
  const authors = lodash.uniqBy(blogs, 'author')
  for (let i = 0; i < lodash.size(authors); i += 1) {
    const a = lodash.filter(blogs, { author: authors[i].author })
    const l = lodash.sumBy(a, 'likes')
    if (l > maxLike) {
      maxLike = l
      maxAuthor = authors[i].author
    }
  }
  const ml = { author: maxAuthor, likes: maxLike }
  return ml
}
const blogCount = (blogs) => blogs.length

module.exports = {
  dummy, gummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, blogCount,
}
