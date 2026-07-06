import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SiteMap } from '../utils/siteMap';

const siteMap = SiteMap.load();

const newsActions = [
  { action: 'newsItem1', expectedUrl: /news\.htm(;jsessionid=[^#]+)?#6/ },
  { action: 'newsItem2', expectedUrl: /news\.htm(;jsessionid=[^#]+)?#5/ },
  { action: 'newsItem3', expectedUrl: /news\.htm(;jsessionid=[^#]+)?#4/ },
];

test.describe('ParaBank news section', () => {
  test('shows news item links', async ({ page }) => {
    const home = new HomePage(page, siteMap);
    await home.goto();
    for (const action of newsActions) {
      await home.expectActionVisible(action.action);
    }
  });

  for (const news of newsActions) {
    test(`clicks ${news.action} and verifies page`, async ({ page }) => {
      const home = new HomePage(page, siteMap);
      await home.goto();
      await home.clickAction(news.action);
      await expect(page).toHaveURL(news.expectedUrl);
    });
  }
});
