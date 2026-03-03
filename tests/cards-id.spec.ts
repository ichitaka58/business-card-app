import { test, expect, Page } from "@playwright/test";
import { randomUUID } from "crypto";

test.describe("Card Page", () => {

    // ユニークなIDを作成する関数
    const createUniqueId = () => `test-${randomUUID()}`;

    // テスト用のカードを作成して、そのカードのページに移動する関数
    async function createCardAndGoToPage(page: Page) {
      const uniqueId = createUniqueId();

        await page.goto("/cards/new");

        await page.getByLabel("ユーザーID*").fill(uniqueId);
        await page.getByLabel("お名前*").fill("テストじろう");
        await page.getByLabel("自己紹介*").fill("playwrightテスト用データです");
        await page.getByLabel("好きな技術*").selectOption({ label: "TypeScript" });
        await page.keyboard.press("Tab");

        const submit = page.getByRole("button", { name: "登録" });
        await expect(submit).toBeEnabled();
        await submit.click();

        await expect(page).toHaveURL(`/cards/${uniqueId}`);
    }

    test("should navigate to the home page when the back button is clicked", async ({ page }) => {
        // テスト用のカードを作成して、そのカードのページに移動する
        await createCardAndGoToPage(page);

        await page.getByRole("button", { name: "ホームに戻る" }).click();
        await expect(page).toHaveURL("/");
        await expect(page.getByRole("heading", { name: "デジタル名刺アプリ" })).toBeVisible();
    })
})