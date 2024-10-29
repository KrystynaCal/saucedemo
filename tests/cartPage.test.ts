import { test, expect } from "@playwright/test";
import { CartPage } from "../page-objects/CartPage";
import { LoginPage } from "../page-objects/LoginPage";
import { ProductPage } from "../page-objects/ProductPage";

test.describe("Cart functionality tests", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Add and remove product from cart", async () => {
    const productName = "Sauce Labs Bolt T-Shirt";
    await productPage.addToCartByProductName(productName);
    await productPage.navigateToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.removeItem(productName);
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("Cart is empty upon initial login", async () => {
    await productPage.navigateToCart();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("Add multiple products to cart and proceed to checkout", async ({
    page,
  }) => {
    const products = ["Sauce Labs Bolt T-Shirt", "Sauce Labs Onesie"];
    for (const product of products) {
      await productPage.addToCartByProductName(product);
    }
    await productPage.navigateToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });
});
