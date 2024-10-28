import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.mainElement).toBeVisible();
  });

  test("Successful login with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(loginPage.header).toContainText("Products");
  });

  test("Login with locked_out_user fails", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
