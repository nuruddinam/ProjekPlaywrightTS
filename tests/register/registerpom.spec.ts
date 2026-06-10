import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { UserFactory } from '../../utils/user-factory';

test('User successfully register using valid credential @p0 @register', async ({ page }) => {

  const user = UserFactory.createUser();

  const registerPage = new RegisterPage(page);

  console.log('Register User:', user);

  await registerPage.goto();
  await registerPage.register(user);
  await registerPage.verifyRegisterSuccess();

});