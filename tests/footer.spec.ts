import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SiteMap } from '../utils/siteMap';

const siteMap = SiteMap.load();

const footerChecks = [
  { action: 'footerHome', url: /index\.htm/ },
  { action: 'footerAboutUs', url: /about\.htm/ },
  { action: 'footerServices', url: /services\.htm/ },
  { action: 'footerProducts', url: /products/ },
  { action: 'footerLocations', url: /solutions/ },
  { action: 'footerSitemap', url: /sitemap\.htm/ },
  { action: 'footerContactUs', url: /contact\.htm/ },
];

test.describe('ParaBank footer navigation', () => {
  for (const check of footerChecks) {
    test(`clicks ${check.action} and navigates`, async ({ page }) => {
      const home = new HomePage(page, siteMap);
      await home.goto();
      await home.clickAction(check.action);
      await expect(page).toHaveURL(check.url);
    });
  }

  test('shows company website footer link', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    await home.expectActionVisible('footerVisitWebsite');
  });
});
