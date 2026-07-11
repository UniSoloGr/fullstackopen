import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'

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