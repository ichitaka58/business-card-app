import z from "zod";

export const CardFormSchema = z.object({
  userId: z
    .string()
    .min(1, "ユーザーIDは必須入力です")
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "英数字、アンダーバー、ハイフン、ピリオドのみ使用できます",
    ),
  name: z.string().min(1, "お名前は必須入力です"),
  description: z.string().min(1, "自己紹介分は必須入力です"),
  skill: z.string().min(1, "好きな技術は必須入力です"),
  githubId: z
    .string()
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "英数字、アンダーバー、ハイフン、ピリオドのみ使用できます",
    )
    .optional()
    .or(z.literal("")), // 空文字は許可
  qiitaId: z
    .string()
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "英数字、アンダーバー、ハイフン、ピリオドのみ使用できます",
    )
    .optional()
    .or(z.literal("")),
  xId: z.string()
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "英数字、アンダーバー、ハイフン、ピリオドのみ使用できます",
    )
    .optional()
    .or(z.literal("")),
});