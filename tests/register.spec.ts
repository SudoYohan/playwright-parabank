import { test } from '@playwright/test';
import RegisterPage, { RegistrationData } from '../pages/registerPage';
import { saveCredentials } from '../utils/credentialStore';

test.describe('Register flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();

    const unique = `user_${Date.now()}`;
    const data: RegistrationData = {
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test St',
      city: 'Testville',
      state: 'TS',
      zipCode: '12345',
      phoneNumber: '555-555-5555',
      ssn: '123-45-6789',
      username: unique,
      password: 'Password123!',
      repeatedPassword: 'Password123!'
    };

    await register.fillRegistration(data);
    await register.submit();
    await register.expectSuccess();

    saveCredentials({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phoneNumber: data.phoneNumber,
      ssn: data.ssn,
      username: data.username,
      password: data.password,
      createdAt: new Date().toISOString()
    });
  });
});
