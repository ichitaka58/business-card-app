"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl font-black text-center mb-4">
            デジタル名刺アプリ
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              const id = userId.trim();
              router.push(`/cards/${id}`);
            }}
            className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
          >
            <fieldset className="fieldset">
              <label className="label">ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="input validator"
                placeholder="IDを入力"
                required
              />
              <p className="validator-hint hidden">IDを入力してください</p>
            </fieldset>
            <button
              className="btn btn-neutral mt-4"
              type="submit"
              disabled={isLoading}
            >
              名刺を見る
            </button>
          </form>
          <p className="text-center mt-4 font-semibold">
            <Link href="/cards/new" className="link">
              新規登録
            </Link>
            はこちら
          </p>
        </div>
      </div>
    </>
  );
}
