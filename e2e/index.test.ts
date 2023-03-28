import { expect, test } from '@playwright/test'

const siteUrl = 'http://localhost:5173'

test('Ensure page rendering right', async ({ page }) => {
  await page.goto(siteUrl)

  const res = await page.evaluate(async () => {
    const content = document.body.innerText
    return content.includes('Layout component')
  })
  expect(res).toBe(true)
})
