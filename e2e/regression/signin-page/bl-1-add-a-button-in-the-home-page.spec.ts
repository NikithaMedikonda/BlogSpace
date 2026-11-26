import { expect, test } from "@playwright/test";

test.describe("Add a button in the home page", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("BL-1 TC-01 Check opens the Hello message page", { tag: ["@smoke"] }, async ({ page }) => {
    const check = page.getByRole("link", { name: "Check", exact: true });

    await test.step("Open the home page", async () => {
      await page.goto("/");
      // The ticket recorded this case on desktop only.
      if (test.info().project.name === "desktop") {
        await expect(check).toBeVisible();
      }
    });

    await test.step("Open the Hello message with Check", async () => {
      await check.click();
      if (test.info().project.name === "desktop") {
        await expect(page).toHaveURL("/hello");
        await expect(page.getByRole("heading", { name: "Hello", exact: true })).toBeVisible();
      }
    });
  });

  test("BL-1 TC-02 Check is not shown on the Hello message page", { tag: ["@negative"] }, async ({ page }) => {
    await test.step("Open the Hello message page", async () => {
      await page.goto("/hello");
    });

    await test.step("Verify the Hello message and absence of Check", async () => {
      // The ticket recorded this case on desktop only.
      if (test.info().project.name === "desktop") {
        await expect(page.getByRole("heading", { name: "Hello", exact: true })).toBeVisible();
        await expect(page.getByRole("link", { name: "Check", exact: true })).not.toBeVisible();
        await expect(page.getByRole("button", { name: "Check", exact: true })).not.toBeVisible();
      }
    });
  });
});
