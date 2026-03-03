import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test.describe("New Card Page", () => {

    // ユニークなIDを作成する関数
    const createUniqueId = () => `test-${randomUUID()}`;

    test("should navigate to card page when submitting valid form", async ({ page }) => {

        const uniqueId = createUniqueId();

        await page.goto("/cards/new");

        await page.getByLabel("ユーザーID*").fill(uniqueId);
        await page.getByLabel("お名前*").fill("テスト太郎");
        await page.getByLabel("自己紹介*").fill("playwrightテスト用ユーザーです");
        await page.getByLabel("好きな技術*").selectOption({ label: "React" });
        await page.getByLabel("GitHub ID").fill("abc");
        await page.getByLabel("Qiita ID").fill("def");
        await page.getByLabel("X ID").fill("ghi");

        await page.getByRole("button", { name: "登録" }).click();

        await expect(page).toHaveURL(`/cards/${uniqueId}`);

        await expect(page.getByRole("heading", { name: "テスト太郎" })).toBeVisible();
    })

    test("should register successfully without optional fields", async ({ page }) => {

        const uniqueId = createUniqueId();

        await page.goto("/cards/new");

        await page.getByLabel("ユーザーID*").fill(uniqueId);
        await page.getByLabel("お名前*").fill("テスト花子");
        await page.getByLabel("自己紹介*").fill("playwrightテスト用オプション未入力です");
        await page.getByLabel("好きな技術*").selectOption({ label: "TypeScript" });
        // Tabキーを押してフォーカスを移動する
        await page.keyboard.press("Tab");

        const submit = page.getByRole("button", { name: "登録" });
        // 登録ボタンが有効になっていることを確認
        await expect(submit).toBeEnabled();
        await submit.click();

        await expect(page).toHaveURL(`/cards/${uniqueId}`);

        await expect(page.getByRole("heading", { name: "テスト花子" })).toBeVisible();

    })
})