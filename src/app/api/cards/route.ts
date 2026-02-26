import { CardFormSchema, CardFormValues } from "../../cards/new/schema";
import { NextResponse } from "next/server";
import { createCard } from "@/src/lib/repositories/cardRepo";


export const POST = async (req: Request) => {
  const body = await req.json();
  const parsed = CardFormSchema.safeParse(body);
  if(!parsed.success) {
    return NextResponse.json({ message: "入力内容を確認してください" }, { status: 400 });
  }
  try {
    const user = await createCard(parsed.data);
    return NextResponse.json({ success: true, user }, { status: 200 });
  }catch(e) {
    console.error(e); // supabaseのエラーメッセージを開発環境ではターミナルに表示
    // HTTPレスポンスとしてクライアント（ブラウザ）に返る。クライアント側のsetErrorに入る
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}