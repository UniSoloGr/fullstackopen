import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, BlogForm } from './Blog'

test('renders title', () => {
    const title = "This is a test title"
    const author = "unisologr"
    
    const blog = {
        title,
        author
    }

    render(
      <Blog
        blog={blog}
      />
    )

    const element = screen.getByText(title, { exact: false })
    expect(element).toBeDefined()
})

test('clicking a button opens full view', async () => {
  const title = "This is test title"
  const author = "unisologr"
  const url = "leetcode.com"

  const blog = {
    title,
    author,
    url
  }

  render(
    <Blog
      blog={blog}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(title, {exact: false})).toBeDefined()
  expect(screen.getByText(author, {exact: false})).toBeDefined()
  expect(screen.getByText(url, {exact: false})).toBeDefined()
  expect(screen.getByText('likes', {exact: false})).toBeDefined()
  expect(screen.getByText('unknown', {exact: false})).toBeDefined()
})

test ('Like -doubleclick works as expected', async () => {
  const title = "This is test title"
  const author = "unisologr"
  const url = "leetcode.com"

  const blog = {
    title,
    author,
    url
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)


  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test ('BlogForm calls createBlog and updates parent state', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(
    <BlogForm
      createBlog={createBlog}
    />
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

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(title)
  expect(createBlog.mock.calls[0][0].author).toBe(author)
  expect(createBlog.mock.calls[0][0].url).toBe(url)
})