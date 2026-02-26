import { UserCardWithSkills } from "@/src/types/card";
import { supabase } from "../supabase/server";
import { notFound } from "next/navigation";
import type { CardFormValues } from "@/src/app/cards/new/schema";
import { Database } from "@/src/types/supabase";

export type UsersInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserSkillInsert =
  Database["public"]["Tables"]["user_skill"]["Insert"];

// 名刺カード情報の取得
export const fetchCardByUserId = async (
  userId: string,
): Promise<UserCardWithSkills> => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      user_id, name, description, github_id, qiita_id, x_id,
      user_skill (
        skills (
          name
        )
      )
    `,
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  // dataがなければNotFound表示
  if (!data) notFound();

  // dataの中からskill名だけの配列を作る
  const skills: string[] = data.user_skill.map((us) => us.skills.name);
  // 名刺に記載するユーザー情報とスキル名をひとつのオブジェクトにまとめる
  const userCardWithSkills: UserCardWithSkills = {
    userId: data.user_id,
    name: data.name,
    description: data.description,
    githubId: data.github_id ?? undefined,
    qiitaId: data.qiita_id ?? undefined,
    xId: data.x_id ?? undefined,
    skills,
  };
  console.log(userCardWithSkills);

  return userCardWithSkills;
};

// 名刺ユーザー情報と仕切る情報をDBへ登録する関数
// usersテーブルとuser_skillテーブル（中間テーブル）へ順番にINSERTする
export const createCard = async (values: CardFormValues) => {
  // 空文字を null に変換するユーティリティ関数
  // DBでは「未入力」は "" ではなく null として扱うため整形する
  const emptyToNull = (v?: string) => {
    const s = (v ?? "").trim();
    return s === "" ? null : s;
  };

  // フロントから受け取った値を
  // usersテーブル用のInsert型（UsersInsert）に変換する関数
  // → DB型に合わせた安全なデータ構造を作る責務
  const toUserInsert = (v: CardFormValues): UsersInsert => ({
    user_id: v.userId,
    name: v.name,
    description: v.description,
    github_id: emptyToNull(v.githubId),
    qiita_id: emptyToNull(v.qiitaId),
    x_id: emptyToNull(v.xId),
  });

  // user_skill（中間テーブル）用のInsert型に変換する関数
  // skillIdはDB上で数値型のため、文字列 → 数値へ変換
  const toUserSkillInsert = (
    userId: string,
    skillId: string,
  ): UserSkillInsert => {
    const n = Number(skillId);
    // 不正なskillId（数値でない・1未満）を事前に弾く
    if (!Number.isInteger(n) || n < 1) throw new Error("skillIdが不正です");

    return { user_id: userId, skill_id: n };
  };

  // DB登録用データを生成（ここで型安全が保証される）
  const insertUserData = toUserInsert(values);
  const insertSkillData = toUserSkillInsert(values.userId, values.skillId);

  // supabaseの戻り値を分割代入 + エイリアス指定
  // data → user に名前を付け替えている
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert(insertUserData)
    .select() // INSERT後のレコードを取得
    .single(); // 1件のみ取得

  // users登録エラー時は呼び出し元へthrow
  if (userError) throw userError;

  // 中間テーブルへスキル情報を登録
  const { error: skillError } = await supabase
    .from("user_skill")
    .insert(insertSkillData);

  // スキル登録エラー時もthrow
  if (skillError) throw skillError;

  // 登録したユーザー情報を呼び出し元(API)へ返す
  return user;
};

