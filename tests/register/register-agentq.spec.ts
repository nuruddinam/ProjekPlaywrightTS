import { expect, test } from '@playwright/test';
import { RegisterAgentQPage } from '../../pages/register/register-agentq.page';
import { UserFactory } from '../../utils/user-factory';
import { pushTestResultToAgentQ } from '../../helpers/agentq-helper';

test.describe('Register AgentQ Reporting Tests', () => {
  let testStartTime: number;

  test.beforeEach(async () => {
    testStartTime = Date.now();
  });

  test.afterEach(async ({}, testInfo) => {
    const executionTime = Date.now() - testStartTime;
    const errorDetails = testInfo.errors.map(e => e.message).join('; ');
    const title = testInfo.title ?? 'Unknown test';
    const status = testInfo.status ?? 'unknown';
    
    await pushTestResultToAgentQ(title, status, executionTime, errorDetails);
  });

  // 🟢 Diubah jadi 2- karena di AgentQ ID-nya adalah TC-2
  test('2-Register success using valid credential @p0 @register', async ({ page }) => {
    const user = UserFactory.createUser();
    const registerPage = new RegisterAgentQPage(page);

    await registerPage.goto();
    await registerPage.register(user);
    await registerPage.verifyRegisterSuccess();
  });

  // 🟢 Diubah jadi 4- karena di AgentQ ID-nya adalah TC-4
  test('4-Register failed using already registered email @p1 @register', async ({ page }) => {
    const registerPage = new RegisterAgentQPage(page);
    const user = UserFactory.createUser();
    user.email = 'nuruddinam46@gmail.com'; 

    await registerPage.goto();
    await registerPage.register(user); 
    await registerPage.verifyErrorMessageIsVisible('Email has already been taken');
  });

  // 🟢 Diubah jadi 5- karena di AgentQ ID-nya adalah TC-5
  test('5-Register failed with mismatched confirm password @p2 @register', async ({ page }) => {
    const registerPage = new RegisterAgentQPage(page);
    const user = UserFactory.createUser();

    await registerPage.goto();
    await registerPage.fillStep1(user.email, user.password, 'berbeda!3'); 
    await expect(registerPage.nextButton).toBeDisabled();
    await registerPage.verifyErrorMessageIsVisible('Passwords do not match');
  });

  // 🟢 Diubah jadi 6- karena di AgentQ ID-nya adalah TC-6
  test('6-Register failed with format email invalid @p1 @register', async ({ page }) => {
    const registerPage = new RegisterAgentQPage(page);
    const user = UserFactory.createUser();

    await registerPage.goto();
    await registerPage.fillStep1('1', user.password, user.password); 
    await expect(registerPage.nextButton).toBeDisabled();
    await registerPage.verifyErrorMessageIsVisible('Please enter a valid email address');
  });

  // 🟢 Diubah jadi 7- karena di AgentQ ID-nya adalah TC-7
  test('7-Register failed with invalid phone number format @p2 @register', async ({ page }) => {
    const registerPage = new RegisterAgentQPage(page);
    const user = UserFactory.createUser();

    await registerPage.goto();
    await registerPage.fillStep1(user.email, user.password, user.password); 
    await registerPage.clickNext();

    await registerPage.fillStep2(user.fullName, '8969'); 
    await registerPage.clickNext();
    await registerPage.verifyErrorMessageIsVisible('Please enter a valid phone number (9-13 digits)');
  });
});