import { expect, Locator, Page } from '@playwright/test';
import { SiteMap } from '../utils/siteMap';

export class LoginPage {
  readonly page: Page;
  readonly siteMap: SiteMap;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteMap = SiteMap.load();
    this.usernameInput = this.page.locator(this.siteMap.getActionSelector('login', 'username'));
    this.passwordInput = this.page.locator(this.siteMap.getActionSelector('login', 'password'));
    this.loginButton = this.page.locator(this.siteMap.getActionSelector('login', 'submit'));
  }

  async goto() {
    await this.page.goto(this.siteMap.getPagePath('login'));
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn() {
    await expect(this.page.getByRole('heading', { name: /Accounts Overview/ })).toBeVisible({ timeout: 5000 });
  }
}
