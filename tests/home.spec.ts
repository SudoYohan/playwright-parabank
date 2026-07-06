import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SiteMap } from '../utils/siteMap';

const siteMap = SiteMap.load();
const homeActionKeys = siteMap.getActionKeys('home');

test.describe('ParaBank home page tests', () => {
  test('loads the home page and verifies the title', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    await home.expectTitleContains('ParaBank');
  });

  test('shows login elements on the home page', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    await expect(home.loginButton).toBeVisible();
    await expect(home.forgotLoginLink).toBeVisible();
    await expect(home.registerLink).toBeVisible();
  });

  test('navigates to forgot login page from home', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    await home.clickForgotLogin();
    await expect(page).toHaveURL(/lookup\.htm/);
  });

  test('navigates to register page from home', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    await home.clickRegister();
    await expect(page).toHaveURL(/register\.htm/);
  });
});
