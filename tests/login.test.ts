import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';


test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page.getByText('Swag Labs')).toBeVisible()
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toContainText('Products')

  });

  test('Login with locked_out_user fails', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });
});