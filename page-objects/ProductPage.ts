import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
  }

  async addToCartByProductName(productName: string) {
    const productCard = this.productCards.filter({
      has: this.page.locator(`.inventory_item_name:has-text("${productName}")`),
    });
    await productCard.locator('button:has-text("Add to cart")').click();
  }

  async navigateToCart() {
    await this.cartIcon.click();
  }
}

