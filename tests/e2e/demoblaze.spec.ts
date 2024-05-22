// @ts-check

import { test, expect } from '@playwright/test';
import { HeaderElement } from '../pages-objects/header-element';

test.describe("DemoBlaze UI tests", () => {
  let headerElement: HeaderElement;

  // Generate random strings for unique username and password
  const randomString = Math.random().toString(36).substring(2,7);
  const username = `username_${randomString}`;
  const password = `password_${randomString}`;

  test.beforeEach(async ({ page }) => {
    // Initialize page object before each test
    headerElement = new HeaderElement(page);
    await page.goto("/");
  });

  test("Should sign up", async ({ page }) => {
    // Listen for dialog that appears after signing up
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe("Sign up successful.");
      await dialog.accept();
    });

    await headerElement.signUp(username, password);
    
    // Click home page link to ensure dialog is processed
    await headerElement.homePageLink.click();
  });

  test("Should log in", async ({ page }) => {
    await headerElement.signUp(username, password);
    await headerElement.logIn(username, password);

    await expect(
      page.getByRole("link", { name: `Welcome ${username}` })
    ).toBeVisible();
  });

  test("Should contact support team", async ({ page }) => {
    // Listen for the dialog that appears after sending a message
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe("Thanks for the message!!");
      await dialog.accept();
    });

    await headerElement.contactSupport(
      "test@mail.com",
      "Test User",
      "Hello Support World!"
    );
  });

  test("Should purchase a monitor", async ({page}) => {
    // Navigate to Monitors section and select Apple monitor
    await page.getByRole("link", { name: "Monitors" }).click();
    await page.getByRole("link", { name: "Apple monitor 24" }).click();
    await page.getByRole("link", { name: "Add to cart" }).click();

    // Go to cart and place the order
    headerElement.cartLink.click();
    await page.getByRole("button", { name: "Place Order" }).click();

    // Fill out the order form and complete purchase
    await page.locator("#name").fill("Test User");
    await page.getByLabel("Credit card:").fill("Test card number");
    await page.getByRole("button", { name: "Purchase" }).click();

    await expect(
      page.getByRole("heading", { name: "Thank you for your purchase!" })
    ).toBeVisible();
  });
});
