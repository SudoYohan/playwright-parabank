import { test } from '@playwright/test';
import { ContactPage } from '../pages/contactPage';

test.describe('Contact form', () => {
  test('should submit the contact form and show a thank-you message', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();

    await contactPage.fillContactForm({
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '555-123-4567',
      message: 'This is a test message from automation.'
    });

    await contactPage.submit();
    await contactPage.expectSuccess('Test User');
  });
});
