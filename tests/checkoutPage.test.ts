import { expect, Page, test } from "@playwright/test";
import { CartPage } from "../page-objects/CartPage";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import { LoginPage } from "../page-objects/LoginPage";
import { ProductPage } from "../page-objects/ProductPage";

test.describe("Checkout Form Tests", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  async function addProductsAndProceedToCheckout(page: Page) {
    const products = ["Sauce Labs Bolt T-Shirt", "Sauce Labs Onesie"];
    for (const product of products) {
      await productPage.addToCartByProductName(product);
    }
    await productPage.navigateToCart();
    await expect(cartPage.cartItems).toHaveCount(products.length);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  }

  test("Fill out checkout form and proceed", async ({ page }) => {
    await addProductsAndProceedToCheckout(page);
    await expect(checkoutPage.secondHeader).toBeVisible();
    await expect(checkoutPage.form).toBeVisible();
    await checkoutPage.fillOutFormAndContinue("John", "Doe", "12345");
  });

  test("Check empty form validation", async ({ page }) => {
    await addProductsAndProceedToCheckout(page);
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required"
    );
  });

  test("Cancel button redirects to cart page", async ({ page }) => {
    await addProductsAndProceedToCheckout(page);
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/cart/);
  });
});
