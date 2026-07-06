import { Page, Locator, expect } from '@playwright/test';
import { SiteMap } from '../utils/siteMap';

export class ContactPage {
  readonly page: Page;
  readonly siteMap: SiteMap;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteMap = SiteMap.load();
    this.nameInput = this.page.locator(this.siteMap.getActionSelector('contact', 'name'));
    this.emailInput = this.page.locator(this.siteMap.getActionSelector('contact', 'email'));
    this.phoneInput = this.page.locator(this.siteMap.getActionSelector('contact', 'phone'));
    this.messageInput = this.page.locator(this.siteMap.getActionSelector('contact', 'message'));
    this.submitButton = this.page.locator(this.siteMap.getActionSelector('contact', 'submit'));
  }

  async goto() {
    await this.page.goto(this.siteMap.getPagePath('contact'));
  }

  async fillContactForm(data: { name: string; email: string; phone: string; message: string }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.messageInput.fill(data.message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccess(name: string) {
    await expect(this.page.getByText(`Thank you ${name}`)).toBeVisible({ timeout: 5000 });
    await expect(this.page.getByText('A Customer Care Representative will be contacting you.')).toBeVisible({ timeout: 5000 });
  }
}
