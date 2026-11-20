import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => { await page.goto('/') })

test('keyboard skip link and desktop section navigation', async ({ page }) => {
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /skip to content/i })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const link = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Projects' })
  await link.click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(link).toHaveAttribute('aria-current', 'location')
})

test('system theme and persisted override work under production CSP', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByLabel('Color theme').selectOption('light')
  await page.route('**/assets/*.js', route => route.abort())
  const response = await page.reload()
  expect(response?.headers()['content-security-policy']).toContain('sha256-')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('project filtering updates cards and count', async ({ page }) => {
  await page.getByRole('button', { name: /^Games/ }).click()
  await expect(page.getByRole('status')).toHaveText('Showing 2 of 8 projects')
  await expect(page.locator('#project-results article')).toHaveCount(2)
  await page.getByRole('button', { name: /^All/ }).click()
  await expect(page.locator('#project-results article')).toHaveCount(8)
})

test('narrow mobile layout and keyboard menu', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
  const menu = page.getByRole('button', { name: /Menu/ })
  await menu.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Contact' }).click()
  await expect(page.locator('#contact')).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('public contact and private project boundaries', async ({ page, request }) => {
  await expect(page.locator('#contact a')).toHaveAttribute('href', 'https://github.com/pauljohnsuela64-prog')
  await expect(page.getByRole('article', { name: 'PolPol AI' }).getByRole('link')).toHaveCount(0)
  await expect(page.locator('a[download], a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
  for (const path of ['/.private/resume.pdf', '/documents/resume.pdf']) {
    const response = await request.get(path)
    expect([403, 404].includes(response.status()) || (response.headers()['content-type']?.includes('text/html') && (await response.text()).includes('<div id="root">'))).toBeTruthy()
  }
})

for (const theme of ['dark', 'light']) {
  test(`axe accessibility in ${theme} theme`, async ({ page }) => {
    await page.getByLabel('Color theme').selectOption(theme)
    const result = await new AxeBuilder({ page }).analyze()
    expect(result.violations.map(({ id, nodes }) => [id, nodes.map(n => n.target)])).toEqual([])
  })
}
