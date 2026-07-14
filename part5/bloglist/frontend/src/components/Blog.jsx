import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const [fullView, setFullView] = useState(false)

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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleFullView}>{buttonText}</button>
      <div style={showFullview}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>
          {blog.user?.username || 'unknown'}
        </div>
        {blog.user?.id === loggedUser.id && (
          <div>
            <button onClick={() => removeBlog(blog)}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

const BlogList = ({ blogs, addLike, removeBlog, loggedUser }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} loggedUser={loggedUser}/>
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