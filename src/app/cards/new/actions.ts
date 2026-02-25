import { Database } from "@/src/types/supabase";
import { CardFormSchema, CardFormValues } from "./schema";
import z from "zod";
import {
  createCardSkill,
  createCardUser,
} from "@/src/lib/repositories/cardRepo";
import { redirect } from "next/navigation";

// export type CardUserValues = Omit<CardFormValues, "skill">;

export type UsersInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserSkillsInsert =
  Database["public"]["Tables"]["user_skill"]["Insert"];

// フォームのスキーマからskillを除外したスキーマ
export const CardActionSchema = CardFormSchema.omit({ skillId: true });
export type CardActionValues = z.infer<typeof CardActionSchema>;

const emptyToNull = (v?: string) => {
  const s = (v ?? "").trim();
  return s === "" ? null : s;
};

const toUsersInsert = (values: CardActionValues): UsersInsert => ({
  user_id: values.userId,
  name: values.name,
  description: values.description,
  github_id: emptyToNull(values.githubId),
  qiita_id: emptyToNull(values.qiitaId),
  x_id: emptyToNull(values.xId),
});

const toUserSkillsInsert = (
  userId: string,
  skillId: string,
): UserSkillsInsert => ({
  user_id: userId,
  skill_id: Number(skillId),
});

export const createCardAction = async (values: CardFormValues) => {
  try {
    // safeParse: 結果オブジェクトを返す
    const parsed = CardActionSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, message: "入力内容を確認してください" };
    }
    // console.log(parsed);

    const parsedData = parsed.data;
    const insertUserData = toUsersInsert(parsedData);
    const insertSkillData = toUserSkillsInsert(values.userId, values.skillId);

    // console.log(insertUserData, insertSkillData);
    const createdCardUser = await createCardUser(insertUserData);
    const createdCardSkill = await createCardSkill(insertSkillData);
    // console.log(createdCardUser);
    // console.log(createdCardSkill);
    if (!createdCardUser || !createdCardSkill) {
      console.error("データの登録に失敗しました");
    }
    redirect("/");
  } catch (error) {
    console.error("データの登録に失敗しました", error);
  }
};
