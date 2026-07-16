import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, BlogForm } from './Blog'
import { MemoryRouter } from 'react-router-dom'

test("unsigned users can't see buttons", () => {
    const title = "This is a test title"
    const author = "unisologr"
    
    const blog = {
      title,
      author,
      likes: 0,
      user: {
        id: '123',
        username: 'root'
      }
    }

    render(
      <Blog
        blog={blog}
      />
    )

    const headerElement = screen.getByText(`${author}: ${title}`, { exact: false })
    const likes = screen.getByText("likes", { exact: false })
    expect(headerElement).toBeDefined()
    expect(likes).toBeDefined()

    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
})

test('another logged user sees only like button', async () => {
  const title = "This is test title"
  const author = "unisologr"
  const url = "leetcode.com"

  const blog = {
    title,
    author,
    url,
    likes: 0,
    user: {
      id: '123',
      username: 'root'
    }
  }

  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      loggedUser={user}
    />
  )

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

  expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
})

test('blog creator sees all buttons', async () => {
  const title = "This is test title"
  const author = "unisologr"
  const url = "leetcode.com"

  const rootUser = {
    id: '123',
    username: 'root'
  }

  const blog = {
    title,
    author,
    url,
    likes: 0,
    user: rootUser 
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      loggedUser={rootUser}
    />
  )

  const user = userEvent.setup()

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

  expect(screen.queryByRole('button', { name: 'remove' })).toBeInTheDocument()
})

test ('BlogForm calls createBlog and updates parent state', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(
    <MemoryRouter>
      <BlogForm
        createBlog={createBlog}
      />
    </MemoryRouter>
  )

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  const title = "This is test title"
  const author = "unisologr"
  const url = "leetcode.com"

  await user.type(input[0], title)
  await user.type(input[1], author)
  await user.type(input[2], url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(title)
  expect(createBlog.mock.calls[0][0].author).toBe(author)
  expect(createBlog.mock.calls[0][0].url).toBe(url)
})