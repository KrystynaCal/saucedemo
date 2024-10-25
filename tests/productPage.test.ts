import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';

test.describe('Product Page Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add product to cart', async ({ page }) => {
    await productPage.addToCartByProductName('Sauce Labs Backpack');
    await productPage.navigateToCart();
    await expect(page.locator('.cart_item:has-text("Sauce Labs Backpack")')).toBeVisible();
  });

  test('Add multiple products to cart', async ({ page }) => {
    await productPage.addToCartByProductName('Sauce Labs Bolt T-Shirt');
    await productPage.addToCartByProductName('Sauce Labs Onesie');
    
    await productPage.navigateToCart();
    await expect(page.locator('.cart_item:has-text("Sauce Labs Bolt T-Shirt")')).toBeVisible();
    await expect(page.locator('.cart_item:has-text("Sauce Labs Onesie")')).toBeVisible();
  });
});