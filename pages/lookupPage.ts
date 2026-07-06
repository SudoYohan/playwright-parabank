import { Page, Locator, expect } from '@playwright/test';
import { SiteMap } from '../utils/siteMap';

export class LookupPage {
  readonly page: Page;
  readonly siteMap: SiteMap;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly addressStreet: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly ssn: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteMap = SiteMap.load();
    this.firstName = this.page.locator(this.siteMap.getActionSelector('lookup', 'firstName'));
    this.lastName = this.page.locator(this.siteMap.getActionSelector('lookup', 'lastName'));
    this.addressStreet = this.page.locator(this.siteMap.getActionSelector('lookup', 'addressStreet'));
    this.city = this.page.locator(this.siteMap.getActionSelector('lookup', 'city'));
    this.state = this.page.locator(this.siteMap.getActionSelector('lookup', 'state'));
    this.zipCode = this.page.locator(this.siteMap.getActionSelector('lookup', 'zipCode'));
    this.ssn = this.page.locator(this.siteMap.getActionSelector('lookup', 'ssn'));
    this.submitButton = this.page.locator(this.siteMap.getActionSelector('lookup', 'submit'));
  }

  async goto() {
    await this.page.goto(this.siteMap.getPagePath('lookup'));
  }

  async fillLookup(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    ssn: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.addressStreet.fill(data.address);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.zipCode.fill(data.zipCode);
    await this.ssn.fill(data.ssn);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectLookupFailure() {
    await expect(this.page.getByText('Error!')).toBeVisible({ timeout: 5000 });
    await expect(this.page.getByText('The customer information provided could not be found.')).toBeVisible({ timeout: 5000 });
  }
}
