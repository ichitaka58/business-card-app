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

// 名刺ユーザー情報のDBへの登録
export const createCard = async (values: CardFormValues) => {
  // 空文字をnullに変更する関数
  const emptyToNull = (v?: string) => {
    const s = (v ?? "").trim();
    return s === "" ? null : s;
  };

  const toUserInsert = (v: CardFormValues): UsersInsert => ({
    user_id: v.userId,
    name: v.name,
    description: v.description,
    github_id: emptyToNull(v.githubId),
    qiita_id: emptyToNull(v.qiitaId),
    x_id: emptyToNull(v.xId),
  });

  const toUserSkillInsert = (userId: string, skillId: string): UserSkillInsert => {
    // skillIdをDB登録のため数値に変換
    const n = Number(skillId);
    if (!Number.isInteger(n) || n < 1) throw new Error("skillIdが不正です");
    return { user_id: userId, skill_id: n }
  };

  const insertUserData = toUserInsert(values);
  const insertSkillData = toUserSkillInsert(values.userId, values.skillId);

  // user, userErrorはJavaScriptの別名指定(エイリアス)
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert(insertUserData)
    .select()
    .single();

  if (userError) throw userError;

  const { error: skillError } = await supabase
    .from("user_skill")
    .insert(insertSkillData);

  if (skillError) throw skillError;

  return user;
};

