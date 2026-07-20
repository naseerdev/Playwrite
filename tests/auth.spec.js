// @ts-check
const { test, expect } = require("@playwright/test");

const EMAIL = "admin@example.com";
const PASSWORD = "password123";

test.describe("Authentication flow", () => {
  test("root redirects to the login page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  });

  test("shows an error with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("badpassword");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByTestId("error-message")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("logs in with the dummy credentials and reaches the dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(EMAIL);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-title")).toHaveText("Dashboard");
    await expect(page.getByTestId("random-text")).not.toBeEmpty();
  });

  test("blocks direct dashboard access when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("logout returns the user to the login page", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(EMAIL);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByTestId("logout-button").click();
    await expect(page).toHaveURL(/\/login$/);

    // After logout, the dashboard should no longer be reachable.
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
});
