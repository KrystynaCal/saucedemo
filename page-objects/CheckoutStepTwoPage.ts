import { Locator, Page } from "@playwright/test";

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly orderSummary: Locator;

  constructor(page: Page) {
    this.finishButton = page.locator('[data-test="finish"]');
    this.orderSummary = page.locator('[data-test="cart-list"]');
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
