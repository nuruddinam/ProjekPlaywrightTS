import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../../pages/register.page';

test('User successfully register using valid credential @p0 @register', async ({ page }) => {

  const registerPage = new RegisterPage(page);

  // Faker Data
  const email = faker.internet.email();
  const password = 'tester!3';
  const fullName = faker.person.fullName();
  const phoneNumber = faker.string.numeric(12);
  const companyName = faker.company.name();

  console.log('Email:', email);
  console.log('Full Name:', fullName);
  console.log('Phone Number:', phoneNumber);
  console.log('Company Name:', companyName);

  await registerPage.goto();

  await registerPage.register(
    email,
    password,
    fullName,
    phoneNumber,
    companyName,
    'ecommerce',
    '11-50'
  );

  await registerPage.verifyRegisterSuccess();

});