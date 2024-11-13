import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly secondHeader: Locator;
  readonly form: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipPostalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.secondHeader = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipPostalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.form = page.locator(".checkout_info");
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async fillOutFormAndContinue(firstName: string, lastName: string, zipPostalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipPostalCodeInput.fill(zipPostalCode);
    await this.continueButton.click();
  }
}
