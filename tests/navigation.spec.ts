import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SiteMap } from '../utils/siteMap';

const siteMap = SiteMap.load();

const navigationChecks = [
  { action: 'topMenuAboutUs', url: /about\.htm/ },
  { action: 'topMenuServices', url: /services\.htm/ },
  { action: 'topMenuContact', url: /contact\.htm/ },
  { action: 'topMenuHome', url: /index\.htm/ },
  { action: 'topMenuAbout', url: /about\.htm/ },
  { action: 'topMenuAdminPage', url: /admin\.htm/ },
  { action: 'topLogo', url: /index\.htm/ },
];

const visibleNavigationKeys = [
  'topMenuProducts',
  'topMenuLocations',
];

test.describe('ParaBank header navigation', () => {
  for (const check of navigationChecks) {
    test(`navigates to ${check.action}`, async ({ page }) => {
      const home = new HomePage(page, siteMap);
      await home.goto();
      await home.clickAction(check.action);
      await expect(page).toHaveURL(check.url);
    });
  }

  test('shows products and locations links in top navigation', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    for (const actionKey of visibleNavigationKeys) {
      await home.expectActionVisible(actionKey);
    }
  });
});
