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
})