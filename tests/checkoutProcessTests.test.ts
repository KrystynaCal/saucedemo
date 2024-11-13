import { expect, test } from "@playwright/test";
import { CartPage } from "../page-objects/CartPage";
import { CheckoutCompletePage } from "../page-objects/CheckoutCompletePage";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import { CheckoutStepTwoPage } from "../page-objects/CheckoutStepTwoPage";
import { LoginPage } from "../page-objects/LoginPage";
import { ProductPage } from "../page-objects/ProductPage";

test.describe("Checkout Process Tests", () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;
  let productPage: ProductPage;
  let checkoutPage: CheckoutPage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await productPage.addToCartByProductName("Sauce Labs Bolt T-Shirt");
    await productPage.navigateToCart();
  });

  test("Successful checkout process", async () => {
    expect(cartPage.isProductInCart("Sauce Labs Bolt T-Shirt")).toBeTruthy();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillOutFormAndContinue("John", "Doe", "12345");
    await expect(checkoutStepTwoPage.orderSummary).toContainText(
      "Sauce Labs Bolt T-Shirt"
    );
    await checkoutStepTwoPage.finishOrder();

    await expect(checkoutCompletePage.completeMessage).toContainText(
      "Thank you for your order!"
    );
  });

  test("Checkout fails with missing personal information", async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillOutFormAndContinue("John", "Doe", "");
    await expect(checkoutPage.errorMessage).toBeVisible();
  });
});
