import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { ProductPage } from "../page-objects/ProductPage";

test.describe("Product Page Tests", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Add product to cart", async () => {
    await productPage.addToCartByProductName("Sauce Labs Bolt T-Shirt");
    await productPage.navigateToCart();
    await expect(
      productPage.cartItemByName("Sauce Labs Bolt T-Shirt")
    ).toBeVisible();
  });

  test("Add multiple products to cart", async () => {
    await productPage.addToCartByProductName("Sauce Labs Bolt T-Shirt");
    await productPage.addToCartByProductName("Sauce Labs Onesie");
    await productPage.navigateToCart();
    await expect(
      productPage.cartItemByName("Sauce Labs Bolt T-Shirt")
    ).toBeVisible();
    await expect(productPage.cartItemByName("Sauce Labs Onesie")).toBeVisible();
  });

  test("Change product sorting order - Price low to high", async () => {
    await expect(productPage.productSortSelector).toBeVisible();
    await productPage.productSortSelector.selectOption("lohi");
    const firstProductName = await productPage.firstProductName.innerHTML();
    expect(firstProductName).toBe("Sauce Labs Onesie");
  });
});
