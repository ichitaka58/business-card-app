'use client';

import React, { useState } from 'react'
import CardForm from './CardForm';

const NewCardPage = () => {

  return (
    <div className="min-h-screen py-12 bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-black text-center mb-4">新規名刺登録</h1>
      <CardForm />
    </div>
  );
}

export default NewCardPage;