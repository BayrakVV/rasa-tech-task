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

  test("Should successfully sign up", async ({ page }) => {
    await headerElement.signUp(username, password);

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Sign up successful.');
      await dialog.accept();
    });
    
    await headerElement.homePageLink.click();
  });

  test("Should successfully log in", async ({ page }) => {
    await headerElement.signUp(username, password);
    await headerElement.LogIn(username, password);

    await expect(
      page.getByRole("link", { name: "Welcome " + username })
    ).toBeVisible();
  });
});
