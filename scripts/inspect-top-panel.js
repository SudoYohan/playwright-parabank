const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  const anchors = await page.$$eval('#topPanel a', els => els.map(a => ({
    href: a.getAttribute('href'),
    text: a.textContent && a.textContent.trim(),
    outer: a.outerHTML
  })));
  console.log(JSON.stringify(anchors, null, 2));
  await browser.close();
})();
