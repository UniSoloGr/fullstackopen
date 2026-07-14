const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'me',
                username: 'unisologr',
                password: 'sekret'
            }
        })

        await page.goto('/')
    })

    test('Login from is shown', async ({ page }) => {
      await expect(page.getByLabel('username')).toBeDefined()
      await expect(page.getByLabel('password')).toBeDefined()
    })

    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await page.getByLabel('username').fill('unisologr')
        await page.getByLabel('password').fill('sekret')

        await page.getByText('login').click()

        await expect(page.getByText('unisologr logged in')).toBeVisible()
      })

      test('fails with wrong credentials', async ({ page }) => {
        await page.getByLabel('username').fill('unisologr')
        await page.getByLabel('password').fill('wrong_password')

        await page.getByText('login').click()

        await expect(page.getByText('unisologr logged in')).not.toBeVisible()
      })
    })
  
    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByLabel('username').fill('unisologr')
        await page.getByLabel('password').fill('sekret')

        await page.getByText('login').click()
      }) 

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()

        const title = "Lost and Crowned"
        const author = "Larry the Skeleton"
        const url = "blogs.com"

        await page.getByLabel("title").fill(title)
        await page.getByLabel("author").fill(author)
        await page.getByLabel("url").fill(url)

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText(`${title} ${author}`)).toBeVisible()
      })

      describe('and a blog exists', () => {
        beforeEach(async ({page}) => {
          await page.getByRole('button', { name: 'new blog' }).click()

          const title = "Lost and Crowned"
          const author = "Larry the Skeleton"
          const url = "blogs.com"

          await page.getByLabel("title").fill(title)
          await page.getByLabel("author").fill(author)
          await page.getByLabel("url").fill(url)

          await page.getByRole('button', { name: 'create' }).click()
        })

        test('blog can be liked', async ({page}) => {
          await page.getByRole('button', { name: "view" }).click()

          await page.getByRole('button', { name: "like" }).click()

          await expect(page.getByText('likes 1')).toBeVisible()
        })
      })
    })
})