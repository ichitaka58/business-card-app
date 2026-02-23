import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { CardFormSchema } from "./schema";

export type CardFormValues = z.infer<typeof CardFormSchema>;

const CardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: CardFormValues) => {
    console.log(values);
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
          className="input validator"
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
          className="input validator"
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
          className="textarea validator"
          placeholder="自己紹介文を入力"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">好きな技術*</span>
        <select className="select validator" {...register("skill")}>
          <option></option>
          <option>React</option>
          <option>TypeScript</option>
          <option>GitHub</option>
        </select>
        {errors.skill && (
          <span className="text-red-500">{errors.skill.message}</span>
        )}
      </label>

      <label className="fieldset">
        <span className="label">GitHub ID</span>
        <input
          type="text"
          className="input validator"
          placeholder="GitHub IDを入力"
          {...register("githubId")}
        />
        <span className="validator-hint hidden">
          {errors.githubId?.message}
        </span>
      </label>

      <label className="fieldset">
        <span className="label">Qiita ID</span>
        <input
          type="text"
          className="input validator"
          placeholder="Qiita IDを入力"
          {...register("qiitaId")}
        />
        <span className="validator-hint hidden">{errors.qiitaId?.message}</span>
      </label>

      <label className="fieldset">
        <span className="label">X ID</span>
        <input
          type="text"
          className="input validator"
          placeholder="X IDを入力(@は不要)"
          {...register("xId")}
        />
        <span className="validator-hint hidden">{errors.xId?.message}</span>
      </label>

      <p>*は必須入力です</p>

      <button
        className="btn btn-neutral mt-4"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "登録"
        )}
      </button>
      <button
        className="btn btn-ghost mt-1"
        type="reset"
        disabled={isSubmitting}
      >
        Reset
      </button>
    </form>
  );
};

export default CardForm;
