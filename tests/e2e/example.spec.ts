// @ts-check

import { test, expect } from '@playwright/test';

test.describe("DemoBlaze UI tests", () => {
  test("Should sign up and log in", async ({ page }) => {
    const randomString = Math.random().toString(36).substring(2,7);
    const username = "username+" + randomString;
    const password = "password+" + randomString;

    await page.goto("https://www.demoblaze.com/");

    await page.getByRole("link", { name: "Sign up" }).click();
    await page.locator("#sign-username").fill(username);
    await page.locator("#sign-password").fill(password);
    await page.getByRole("button", { name: "Sign up" }).click();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Sign up successful.');
      await dialog.accept();
    });

    await page.getByRole("link", { name: "Log in" }).click();
    await page.locator("#loginusername").fill(username);
    await page.locator("#loginpassword").fill(password);
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(
      page.getByRole("link", { name: "Welcome " + username })
    ).toBeVisible();
  });
});

test.describe("Graphql API tests", () => {
  test("Should get details of Africa continent", async ({ request }) => {
    const response = await request.post(
      "https://countries.trevorblades.com/graphql",
      {
        data: {
          query: `
          query {
            continent(code: "AF") {
              code
              name
            }
          }
        `,
        },
      }
    );

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({
      data: {
        "continent": {
          code: "AF",
          name: "Africa"
        }
      }
    })
  });
});
