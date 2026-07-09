import { useState } from 'react'

const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)

  const toggleFullView = () => {
    setFullView(!fullView)
  }
  const showFullview = { display: fullView ? '' : 'none'}
  const buttonText = fullView
    ? "hide"
    : "view"

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
          {blog.likes}
          <button>like</button>
        </div>
        <div>
          {blog.user?.username || "unknown"}
        </div>
      </div>
    </div>  
  )
}

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