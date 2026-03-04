[![Jest Tests](https://github.com/ichitaka58/business-card-app/actions/workflows/jest.yml/badge.svg?branch=main&event=push)](https://github.com/ichitaka58/business-card-app/actions/workflows/jest.yml)
[![Playwright Tests](https://github.com/ichitaka58/business-card-app/actions/workflows/playwright.yml/badge.svg?event=pull_request)](https://github.com/ichitaka58/business-card-app/actions/workflows/playwright.yml)

# Business Card App (デジタル名刺アプリ)

このプロジェクトは、Next.jsで構築されたデジタル名刺アプリケーションです。

## 主な技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) (App Router対応)
- **UIライブラリ**: [React 19](https://react.dev/)
- **スタイリング**: [Tailwind CSS v4](https://tailwindcss.com/) / [DaisyUI v5](https://daisyui.com/)
- **バックエンド / DB / 認証**: [Supabase](https://supabase.com/) (`@supabase/ssr` を使用)
- **フォーム・バリデーション**: React Hook Form, Zod
- **テスト**: 
  - ユニットテスト: [Jest](https://jestjs.io/) & React Testing Library
  - E2Eテスト: [Playwright](https://playwright.dev/)

## プロジェクトのセットアップ

1. **リポジトリのクローン**と依存関係のインストール

   ```bash
   npm install
   ```
   *(必要に応じて `yarn`, `pnpm`, `bun` を使用してください)*

2. **環境変数の設定**

   `.env.example` を参考に、`.env.local` ファイルを作成し、必要な環境変数を設定してください。
   (例: SupabaseのURLやAnon Keyなどの設定)
   
   ```bash
   cp .env.example .env.local
   ```

3. **開発サーバーの起動**

   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開き、アプリケーションにアクセスします。

## スクリプト

- `npm run dev` : 開発サーバーを起動します。
- `npm run build` : プロダクション用のビルドを作成します。
- `npm run start` : ビルドしたアプリケーションをプロダクションモードで起動します。
- `npm run lint` : ESLintを使用してコードの静的解析を行います。
- `npm run test` : Jestによるユニットテストを実行します。

## プロジェクト構造（主要部分）

- `src/app/` : Next.jsのApp Routerによる各ページのコンポーネントやAPIルート
  - `cards/` : 名刺一覧、新規作成、詳細表示などの機能
- `src/lib/` : アプリケーション全体で利用するライブラリやユーティリティ（例: Supabaseクライアント設定など）
- `src/types/` : TypeScriptの型定義ファイル
- `tests/` / `__tests__` : JestやPlaywrightのテストファイル群
