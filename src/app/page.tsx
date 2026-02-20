'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {


  const [userId, setUserId] = useState<string>("");
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
              const id = userId.trim();
              router.push(`/cards/${id}`)
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
            <button className="btn btn-neutral mt-4" type="submit">
              名刺を見る
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
