import { Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.completeMessage = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
}
