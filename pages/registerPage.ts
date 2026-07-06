import { Page, Locator, expect } from '@playwright/test';
import { SiteMap } from '../utils/siteMap';

export type RegistrationData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  username: string;
  password: string;
  repeatedPassword?: string;
};

export default class RegisterPage {
  readonly page: Page;
  readonly site: SiteMap;

  constructor(page: Page) {
    this.page = page;
    this.site = SiteMap.load();
  }

  locatorFor(key: string): Locator {
    return this.page.locator(this.site.getActionSelector('register', key));
  }

  async goto() {
    await this.page.goto(this.site.getPagePath('register'));
  }

  async fillRegistration(data: RegistrationData) {
    await this.locatorFor('firstName').fill(data.firstName);
    await this.locatorFor('lastName').fill(data.lastName);
    await this.locatorFor('address').fill(data.address);
    await this.locatorFor('city').fill(data.city);
    await this.locatorFor('state').fill(data.state);
    await this.locatorFor('zipCode').fill(data.zipCode);
    await this.locatorFor('phoneNumber').fill(data.phoneNumber);
    await this.locatorFor('ssn').fill(data.ssn);
    await this.locatorFor('username').fill(data.username);
    await this.locatorFor('password').fill(data.password);
    await this.locatorFor('repeatedPassword').fill(data.repeatedPassword ?? data.password);
  }

  async submit() {
    await this.locatorFor('registerButton').click();
  }

  async expectSuccess() {
    await expect(this.page).toHaveTitle(/ParaBank/);
    await expect(this.page.getByRole('heading', { name: /^Welcome/ })).toBeVisible({ timeout: 5000 });
  }
}
