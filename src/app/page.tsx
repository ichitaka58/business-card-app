'use client';
import Image from "next/image";
import { useState } from "react";
import {
  FaRegNewspaper,
  FaSquareGithub,
  FaSquareXTwitter,
} from "react-icons/fa6";
import type { UserCard } from "@/src/types";
import { fetchCardByUserId } from "../lib/repositories/cardRepo";
import router from "next/router";


export default function Home() {

  const [userId, setUserId] = useState<string>("");
  // const [userCard, setUserCard] = useState<UserCard | null>(null);

  // const onSubmit = async (userId: string) => {
  //   try {
  //     const targetUserCard = await fetchCardByUserId(userId);
  //     setUserCard(targetUserCard);

  //   }catch(error) {
  //     console.error("データの取得エラー", error);
  //     alert("データが取得できません");
  //   }
  // }

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
              router.push(`/cards/${userId}`)
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
        <div className="card w-60 bg-base-100 card-md shadow-sm">
          <div className="card-body">
            <h2 className="card-title">デジタル名刺アプリ</h2>
            <h3 className="font-bold">自己紹介</h3>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <h3 className="font-bold">好きな技術</h3>
            <p>React</p>
            <div className="justify-center card-actions">
              <FaSquareGithub size={48} />
              <FaSquareXTwitter size={48} />
              <FaRegNewspaper size={48} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
