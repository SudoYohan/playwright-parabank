const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  const locator = page.locator("a[href='lookup.htm']");
  console.log('locator count', await locator.count());
  console.log('locator visible', await locator.isVisible());
  console.log('locator text', await locator.allTextContents());

  const anchors = await page.$$eval('a', els => els.map(a => ({ href: a.getAttribute('href'), text: a.textContent && a.textContent.trim() })));
  console.log('anchors', anchors);

  await browser.close();
})();
