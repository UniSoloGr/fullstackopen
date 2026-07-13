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
})