import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.emra.chat/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('nuruddinam46@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('S');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Suksesmulia99');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Emra! 🎉' })).toBeVisible();
  await page.screenshot({path: 'screenshots/login-success.png', fullPage: true});
});

// Best Practice

test('login success', async ({ page }) => {
  // Open login page
  await page.goto('https://www.emra.chat/login');
  // Fill email
  await page.getByRole('textbox', {name: 'Email'}).fill('nuruddinam46@gmail.com');
  // Fill password
  await page.getByRole('textbox', {name: 'Password'}).fill('Suksesmulia99');
  // Click sign in
  await page.getByRole('button', {name: 'Sign In'}).click();
  // Assertion
  await expect(page.getByRole('heading', {name: 'Welcome to Emra! 🎉',exact: true})).toBeVisible();
  // Screenshot
  await page.screenshot({path: 'screenshots/login-success.png',fullPage: true});

  });

  test('login failed password invalid', async ({ page }) => {
  await page.goto('https://www.emra.chat/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('nuruddinam46@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('a');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Invalid credentials')).toBeVisible();

});

test('login failed email invalid', async ({ page }) => {
  await page.goto('https://www.emra.chat/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('a');
  await page.getByRole('textbox', { name: 'Password' }).fill('a');
  await page.getByRole('button', { name: 'Sign In' }).click();
  const validationMessage = await page.getByRole('textbox', { name: 'Email' }).evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(validationMessage).toContain("Please include an '@' in the email address. 'a' is missing an '@'.");

});

