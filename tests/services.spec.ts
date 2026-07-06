// import { test, expect } from '@playwright/test';
// import { HomePage } from '../pages/homePage';
// import { SiteMap } from '../utils/siteMap';

// const siteMap = SiteMap.load();

// const serviceActions = [
//   { action: 'atmWithdrawFunds', titleCheck: /Withdraw Funds/ },
//   { action: 'atmTransferFunds', titleCheck: /Transfer Funds/ },
//   { action: 'atmCheckBalances', titleCheck: /Check Balances/ },
//   { action: 'atmMakeDeposits', titleCheck: /Make Deposits/ },
//   { action: 'onlineBillPay', titleCheck: /Bill Pay/ },
//   { action: 'onlineAccountHistory', titleCheck: /Account History/ },
//   { action: 'onlineTransferFunds', titleCheck: /Transfer Funds/ },
// ];

// test.describe('ParaBank service links', () => {
//   test('shows all service links', async ({ page }) => {
//     const home = new HomePage(page, siteMap);
//     await home.goto();
//     for (const action of serviceActions) {
//       await home.expectActionVisible(action.action);
//     }
//   });

//   for (const service of serviceActions) {
//     test(`clicks ${service.action} and verifies page`, async ({ page }) => {
//       const home = new HomePage(page, siteMap);
//       await home.goto();
//       await home.clickAction(service.action);
//       await expect(page).toHaveTitle(service.titleCheck);
//     });
//   }
// });
