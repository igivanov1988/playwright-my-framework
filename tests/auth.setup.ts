import { test as setup, expect } from '@playwright/test';
import path from 'path';

const username = process.env.APP_USERNAME!;
const password = process.env.PASSWORD!;
const baseUrl = process.env.BASE_URL!;

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseUrl);
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Dashboard' })).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});