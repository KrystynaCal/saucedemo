import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.usernameInput = page.locator('input[placeholder="Username"]');
      this.passwordInput = page.locator('input[placeholder="Password"]');
      this.loginButton = page.locator('button', { hasText: 'Login' });
    }
  
    async navigate() {
      await this.page.goto('https://your-login-page-url.com');
    }
  
    async login(username: string, password: string) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  }