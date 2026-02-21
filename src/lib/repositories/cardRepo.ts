import { UserCardWithSkills } from "@/src/types/card";
import { supabase } from "../supabase/client";
import { notFound } from "next/navigation";

export const fetchCardByUserId = async (userId: string): Promise<UserCardWithSkills> => {
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
