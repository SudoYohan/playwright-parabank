import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { SiteMap } from '../utils/siteMap';

export class HomePage extends BasePage {
  readonly loginButton: Locator;
  readonly forgotLoginLink: Locator;
  readonly registerLink: Locator;

  constructor(page: Page, private siteMap: SiteMap) {
    super(page);
    this.loginButton = this.page.locator(this.siteMap.getActionSelector('home', 'login'));
    this.forgotLoginLink = this.page.locator(this.siteMap.getActionSelector('home', 'forgotLogin'));
    this.registerLink = this.page.locator(this.siteMap.getActionSelector('home', 'register'));
  }

  getLocator(actionKey: string): Locator {
    return this.page.locator(this.siteMap.getActionSelector('home', actionKey));
  }

  async goto() {
    await this.page.goto(this.siteMap.getPagePath('home'));
  }

  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text));
  }

  async clickAction(actionKey: string) {
    const locator = this.getLocator(actionKey);
    await expect(locator).toBeVisible();
    await locator.click();
  }

  async expectActionVisible(actionKey: string) {
    await expect(this.getLocator(actionKey)).toBeVisible();
  }

  async clickForgotLogin() {
    await this.clickAction('forgotLogin');
  }

  async clickRegister() {
    await this.clickAction('register');
  }
}
