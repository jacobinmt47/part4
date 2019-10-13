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
module.exports = {
  dummy, gummy, totalLikes, favoriteBlog,
}
