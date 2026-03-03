import { test, expect } from "@playwright/test";

test.describe("Top Page", () => {

    test("should navigate to the new registration page when 'New Registration' is clicked", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: "新規登録" }).click();

        await expect(page).toHaveURL("/cards/new");

        await expect(page.getByRole("heading", { name: "新規名刺登録" })).toBeVisible();
    })


})