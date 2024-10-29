import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeButton: (productName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton = (productName: string) =>
      page.locator(
        `.cart_item:has-text("${productName}") >> button[data-test="remove-${productName
          .toLowerCase()
          .replace(/ /g, "-")}"]`
      );
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeItem(productName: string) {
    await this.removeButton(productName).click();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    return this.cartItems
      .locator(`.cart_item:has-text("${productName}")`)
      .isVisible();
  }
}
