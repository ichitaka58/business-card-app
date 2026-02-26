import { CardFormSchema, CardFormValues } from "../../cards/new/schema";
import { NextResponse } from "next/server";
import { createCard } from "@/src/lib/repositories/cardRepo";

// /api/cards への POST リクエストを処理するAPIルート
export const POST = async (req: Request) => {
  // リクエストボディ(JSON)を取得
  const body = await req.json();
  
  // safeParse: Zodのバリデーションメソッド。
  // 例外を投げずに { success: boolean, data | error } を返す。
  // → フロントから送られたデータ構造がスキーマ通りか安全に検証できる。
  const parsed = CardFormSchema.safeParse(body);

  // バリデーションエラー時は400を返す
  if (!parsed.success) {
    // NextResponse:
    // Next.js(App Router)用のレスポンス生成クラス。
    // JSONレスポンスやステータスコードを簡潔に返せる。
    return NextResponse.json(
      { message: "入力内容を確認してください" },
      { status: 400 },
    );
  }
  try {
    // バリデーション済みデータ(parsed.data)のみをDB登録処理へ渡す
    const user = await createCard(parsed.data);
    // 登録成功時は200を返す
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (e) {
    // サーバー側（Supabase）のエラーは開発環境で確認できるようターミナルにログ出力
    console.error(e);

    // 想定外エラーは500としてクライアントへ返す
    // → フロント側では setError などで表示される
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}