// @ts-check

import { test, expect } from '@playwright/test';
import { HeaderElement } from '../pages-objects/header-element';

test.describe("DemoBlaze UI tests", () => {
  let headerElement: HeaderElement;
  
  const randomString = Math.random().toString(36).substring(2,7);
  const username = "username+" + randomString;
  const password = "password+" + randomString;

  test.beforeEach(async ({ page }) => {
    headerElement = new HeaderElement(page);

    await page.goto("/");
  });

  test("Should sign up", async ({ page }) => {
    await headerElement.signUp(username, password);

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Sign up successful.');
      await dialog.accept();
    });
    
    await headerElement.homePageLink.click();
  });

  test("Should log in", async ({ page }) => {
    await headerElement.signUp(username, password);
    await headerElement.LogIn(username, password);

    await expect(
      page.getByRole("link", { name: "Welcome " + username })
    ).toBeVisible();
  });

  test("Should purchase a monitor", async ({page}) => {
    await page.getByRole("link", { name: "Monitors" }).click();
    await page.getByRole("link", { name: "Apple monitor 24" }).click();
    await page.getByRole("link", { name: "Add to cart" }).click();

    headerElement.cartLink.click();

    await page.getByRole("button", { name: "Place Order" }).click();
    await page.getByLabel('Total:').fill('Test User');
    await page.getByLabel('Credit card:').fill('Test card number');
    await page.getByRole('button', { name: 'Purchase' }).click();

    await expect(
      page.getByRole("heading", { name: "Thank you for your purchase!" })
    ).toBeVisible();
  });
});
