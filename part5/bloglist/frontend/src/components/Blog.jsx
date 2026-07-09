import { useState } from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input value={title} onChange={(event) => setTitle(event.target.value)}/>
      </div>
      <div>
        author:
        <input value={author} onChange={(event) => setAuthor(event.target.value)}/>
      </div>
      <div>
        url:
        <input value={url} onChange={(event) => setUrl(event.target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export {Blog, BlogForm, BlogList}