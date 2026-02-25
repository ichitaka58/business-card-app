import { Database } from "@/src/types/supabase";
import { CardFormSchema, CardFormValues } from "../../cards/new/schema";
import { NextResponse } from "next/server";


export type UsersInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserSkillInsert =
  Database["public"]["Tables"]["user_skill"]["Insert"];



export const POST = async (req: Request) => {
  const body = await req.json();
  const parsed = CardFormSchema.safeParse(body);
  if(!parsed.success) {
    return NextResponse.json({ message: "入力内容を確認してください" }, { status: 400 });
  }
  try {
    //
  }catch(e) {
    console.error(e); // supabaseのエラーメッセージを開発環境ではターミナルに表示
    // HTTPレスポンスとしてクライアント（ブラウザ）に返る。クライアント側のsetErrorに入る
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}