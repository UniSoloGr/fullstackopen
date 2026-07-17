import { useState } from 'react'
import {
  useParams,
  useNavigate,
  Link
} from 'react-router-dom'
import { TextField, Button } from '@mui/material'

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
          {loggedUser && <button onClick={() => addLike(blog)}>like</button>}
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

  const navigate = useNavigate()

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
   
    navigate('/')
  }

  const style = { marginTop: 10 }
  const inputStyle = {
  width: '100%',
  maxWidth: '450px',
  height: '35px',          
  padding: '0 0px 10px 0px',       
  marginBottom: '16px',
  fontSize: '14px',
  lineHeight: '36px',      
};

  return (
    <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
        <TextField label="title" value={title} style={inputStyle} onChange={(event) => setTitle(event.target.value)}/>
      </div>
      <div>
        <TextField label="author" value={author} style={inputStyle} onChange={(event) => setAuthor(event.target.value)}/>
      </div>
      <div>
        <TextField label="url" value={url} style={inputStyle} onChange={(event) => setUrl(event.target.value)}/>
      </div>
      <Button variant='contained' type="submit" style={style}>create</Button>
    </form>
  )
}

export { Blog, BlogForm, BlogList }