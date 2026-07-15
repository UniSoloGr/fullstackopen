import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate,
  useMatch
} from 'react-router-dom'
import { Blog, BlogList, BlogForm } from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const timeoutTimer = 5000
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, timeoutTimer)
  }

  const sortBlogs = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)
      console.log("ok")
      setBlogs(blogs.concat(newBlog))
      showNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
    } catch (error) {
      showNotification('Missing one of the input fields!', 'error')
      console.log(error)
    }
  }

  const removeBlog = async (blogObject) => {
    event.preventDefault()
    const blogId = blogObject.id

    let verification = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)

    if (!verification) {
      return
    }

    try {
      await blogService.remove(blogId)
      setBlogs(
        blogs.filter(blog =>
          blog.id !== blogId
        )
      )
    } catch (error) {
      console.log('error', error)
    }
  }

  const addLike = async (blogObject) => {
    event.preventDefault()

    if (!user) {
      showNotification('Only logged users can like blogs', 'error')
      return
    }

    const modBlogObject = {
      ...blogObject,
      likes: blogObject.likes + 1,
    }

    try {
      await blogService.like(modBlogObject)
      setBlogs(
        blogs.map(blog =>
          blog.id === modBlogObject.id ? modBlogObject: blog
        )
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const padding = {
    padding: 5
  }

  const LoginRoute = () => (
    <Route path='/login' element={
      <div>{loginForm()}</div>
    } />
  )

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  
  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {!user && (
          <Link style={padding} to="/login">login</Link>
        )}
        {user && (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>
      <Routes>
        <Route path='/blogs/:id' element={
          <Blog key={blog?.id} blog={blog} addLike={addLike} removeBlog={removeBlog} loggedUser={user}/>
        } />
        <Route path='/' element={
          <BlogList blogs={blogs} addLike={addLike} removeBlog={removeBlog} loggedUser={user}/>
        } />
        {!user && <Route path='/login' element={
          <div>{loginForm()}</div>
        } />}
      </Routes>
    </div>
  )

}

export default App