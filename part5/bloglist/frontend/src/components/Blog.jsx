import { useState } from 'react'
import {
  useParams,
  useNavigate,
  Link
} from 'react-router-dom'

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const id = useParams().id
  const [fullView, setFullView] = useState(false)

  if (!blog) {
    return null
  }

  const toggleFullView = () => {
    setFullView(!fullView)
  }
  const showFullview = { display: fullView ? '' : 'none' }
  const buttonText = fullView
    ? 'hide'
    : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      <h1>{blog.author}: {blog.title}</h1>
        <div>
          <a href={blog.url} >{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>
          {blog.user?.username || 'unknown'}
        </div>
        {blog.user?.id === loggedUser?.id && (
          <div>
            <button onClick={() => removeBlog(blog)}>remove</button>
          </div>
        )}
    </div>
  )
}

const BlogList = ({ blogs, addLike, removeBlog, loggedUser }) => {
  return (
    <div>
      <h1>blogs</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog?.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </li>
        ))}
      </ul>
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
        <label>
          title:
          <input value={title} onChange={(event) => setTitle(event.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          author:
          <input value={author} onChange={(event) => setAuthor(event.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          url:
          <input value={url} onChange={(event) => setUrl(event.target.value)}/>
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export { Blog, BlogForm, BlogList }