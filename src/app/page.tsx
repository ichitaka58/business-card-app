import Image from "next/image";
import { FaRegNewspaper, FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
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
  );
}
