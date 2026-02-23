'use client';

import React, { useState } from 'react'
import CardForm from './CardForm';

const NewCardPage = () => {

  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [githubId, setGithubId] = useState<string>("");
  const [qiitaId, setQiitaId] = useState<string>("");
  const [xId, setXId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {

  }


  return (
    <div className="min-h-screen py-12 bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-black text-center mb-4">新規名刺登録</h1>
      <CardForm />
    </div>
  );
}

export default NewCardPage;