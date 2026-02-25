import { UserCardWithSkills } from "@/src/types/card";
import { supabase } from "../supabase/client";
import { notFound } from "next/navigation";
import { UsersInsert, UserSkillsInsert } from "@/src/app/cards/new/actions";
import { CardFormValues } from "@/src/app/cards/new/schema";

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

// 名刺ユーザー情報の登録
export const createCard = async (values: CardFormValues) => {

  const emptyToNull = (v?: string) => {
    const s = (v ?? "").trim();
    return s === "" ? null : s;
  };

  const { data, error } = await supabase
    .from("users")
    .insert({
      user_id: values.userId,
      name: values.name,
      description: values.description,
      github_id: emptyToNull(values.githubId),
      qiita_id: emptyToNull(values.qiitaId),
      x_id: emptyToNull(values.xId),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createCardUser = async (insertUserData: UsersInsert) => {
  const { data, error } = await supabase
    .from("users")
    .insert(insertUserData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createCardSkill = async (insertSkillData: UserSkillsInsert) => {
  const { data, error } = await supabase
    .from("user_skill")
    .insert([
      { user_id: insertSkillData.user_id, skill_id: insertSkillData.skill_id },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
