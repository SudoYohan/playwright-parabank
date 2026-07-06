import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { loadCredentials } from '../utils/credentialStore';

test.describe('Login flow', () => {
  test('should login with credentials saved from registration', async ({ page }) => {
    let credentials;
    try {
      credentials = loadCredentials();
    } catch (error) {
      test.skip('No persisted registration credentials found. Run tests/register.spec.ts first.');
      return;
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.expectLoggedIn();
  });
});
