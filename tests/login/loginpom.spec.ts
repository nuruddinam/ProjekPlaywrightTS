import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('1-Login success use valid credential @p0 @login @smoketest', async ({ page }) => {
 const email ="nuruddinam46@gmail.com"
 const password = "Suksesmulia99"
 const loginPage = new LoginPage(page)

 await loginPage.goto()
 await loginPage.emailField.fill(email)
 await loginPage.passwordField.fill(password)
 await loginPage.loginButton.click();
});

test('2-Login failed email invalid @p0 @login @smoketest', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('nuruddinam@gmail.com', 'Suksesmulia99');
  await loginPage.verifyInvalidCredentials();
});


test('3-Login failed password invalid @p0 @login @smoketest', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('nuruddinam46@gmail.com','a');
  await loginPage.verifyInvalidCredentials();
});

test('4-Login failed email and password invalid @p0 @login @smoketest', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('nuruddinam@gmail.com', 'a');
  await loginPage.verifyInvalidCredentials();
});

test('5-Login failed format email invalid @p0 @login @smoketest', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('a', 'a');
  await loginPage.verifyInvalidEmailFormat();
});