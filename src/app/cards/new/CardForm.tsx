"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardFormSchema, type CardFormValues } from "./schema";
import { useRouter } from "next/navigation";

const CardForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<CardFormValues>({
    // zodのスキーマをRHFのバリデーションシステムと接続
    resolver: zodResolver(CardFormSchema),
    // フィールドからフォーカスが外れた時にバリデーションを実行
    mode: "onBlur",
  });

  // react-hook-form の submit ハンドラ。フォーム送信時の処理
  // フォームの入力値をAPI(/api/cards)に送信し、
  // レスポンスがOKならフォームを初期化して名刺カードページに遷移。
  // エラーの場合は setError を使ってフォームにエラーメッセージを表示する。
  const onSubmit = async (values: CardFormValues) => {
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    // JSONじゃなかった場合も落ちない。
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      // サーバー側のエラーをフォームに出す setError: react-hook-formより
      setError("userId", {
        type: "server",
        message: json?.message ?? "登録に失敗しました",
      });
      return;
    }
    // フォームをクリア
    reset();
    // 登録したIDの名刺カードページに遷移
    router.push(`/cards/${json.user.user_id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <fieldset className="fieldset">
        <label className="label">ユーザーID*</label>
        <input
          type="text"
          className={`input validator ${errors.userId && "input-error"}`}
          placeholder="ID"
          {...register("userId")}
        />
        {errors.userId && (
          <p className="text-red-500">{errors.userId.message}</p>
        )}
      </fieldset>

      <label className="fieldset">
        <span className="label">お名前*</span>
        <input
          type="text"
          className={`input validator ${errors.name && "input-error"}`}
          placeholder="お名前"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">自己紹介*</span>
        <textarea
          className={`textarea validator ${errors.description && "textarea-error"}`}
          placeholder="自己紹介文を入力"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">好きな技術*</span>
        <select
          className={`select validator ${errors.skillId && "select-error"}`}
          {...register("skillId")}
        >
          <option value="" className="text-gray-400">
            選択してください
          </option>
          <option value="1">React</option>
          <option value="2">TypeScript</option>
          <option value="3">GitHub</option>
        </select>
        {errors.skillId && (
          <span className="text-red-500">{errors.skillId.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">GitHub ID</span>
        <input
          type="text"
          className={`input validator ${errors.githubId && "input-error"}`}
          placeholder="GitHub IDを入力"
          {...register("githubId")}
        />
        {errors.githubId && (
          <span className="text-red-500">{errors.githubId.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">Qiita ID</span>
        <input
          type="text"
          className={`input validator ${errors.qiitaId && "input-error"}`}
          placeholder="Qiita IDを入力"
          {...register("qiitaId")}
        />
        {errors.qiitaId && (
          <span className="text-red-500">{errors.qiitaId.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">X ID</span>
        <input
          type="text"
          className={`input validator ${errors.xId && "input-error"}`}
          placeholder="X IDを入力(@は不要)"
          {...register("xId")}
        />
        {errors.xId && (
          <span className="text-red-500">{errors.xId?.message}</span>
        )}
      </label>

      <p>*は必須入力です</p>

      <button
        className="btn btn-neutral mt-4"
        type="submit"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>
            <span className="ml-2">Loading</span>
          </>
        ) : (
          "登録"
        )}
      </button>
      <button
        className="btn btn-ghost mt-1"
        type="button"
        disabled={isSubmitting}
        onClick={() => reset()}
      >
        Reset
      </button>
    </form>
  );
};

export default CardForm;
