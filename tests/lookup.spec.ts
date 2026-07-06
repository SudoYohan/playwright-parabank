import { test } from '@playwright/test';
import { LookupPage } from '../pages/lookupPage';
import { loadCredentials } from '../utils/credentialStore';
import { LoginPage } from '../pages/loginPage';

test.describe('Customer lookup and login reuse', () => {
  test('should use saved registration details to run forgot-login lookup then login again', async ({ page }) => {
    let credentials;
    try {
      credentials = loadCredentials();
    } catch (error) {
      test.skip('No persisted registration credentials found. Run tests/register.spec.ts first.');
      return;
    }

    const lookup = new LookupPage(page);
    await lookup.goto();
    await lookup.fillLookup({
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      address: credentials.address,
      city: credentials.city,
      state: credentials.state,
      zipCode: credentials.zipCode,
      ssn: credentials.ssn
    });
    await lookup.submit();
    await lookup.expectLookupFailure();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.expectLoggedIn();
  });
});
