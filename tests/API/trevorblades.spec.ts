// @ts-check

import { test, expect } from "@playwright/test";

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
