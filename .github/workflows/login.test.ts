import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';


test.describe('login', () => {
  let loginPage; LoginPage;
  test('correct', async ({ page })) => {
    loginPage = new LoginPage(page);
    await LoginPage.navi
  }
})
