import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productCard: Locator;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;
  readonly addToCart: Locator;
  readonly cartItemByName: (productName: string) => Locator;
  readonly productSortSelector: Locator;
  readonly firstProductName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCard = page.locator(".inventory_item");
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartItemByName = (productName: string) =>
      page.locator(`.cart_item:has-text("${productName}")`);
    this.firstProductName = page
      .locator(
        '[data-test="inventory-item"] >> [data-test="inventory-item-name"]'
      )
      .first();
    this.productSortSelector = page.locator(
      '[data-test="product-sort-container"]'
    );
  }

  async addToCartByProductName(productName: string) {
    const productCard = this.productCard.filter({
      has: this.page.locator(`.inventory_item_name:has-text("${productName}")`),
    });
    await productCard.locator('button:has-text("Add to cart")').click();
  }

  async navigateToCart() {
    await this.cartIcon.click();
  }
}
