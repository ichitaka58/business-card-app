import { fetchCardByUserId } from "@/src/lib/repositories/cardRepo";
import {
  FaRegNewspaper,
  FaSquareGithub,
  FaSquareXTwitter,
} from "react-icons/fa6";

const CardPage = async ({
  params,
}:{
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const userCardWithSkills = await fetchCardByUserId(id);



  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="card w-60 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{userCardWithSkills.name}</h2>
          <h3 className="font-bold">自己紹介</h3>
          <p>{userCardWithSkills.description}</p>
          <h3 className="font-bold">好きな技術</h3>
          <ul className="flex gap-2">
            {userCardWithSkills.skills.map((s, index) => (
              <li key={index}>
                {s}
                {index !== userCardWithSkills.skills.length - 1 && ","}
              </li>
            ))}
          </ul>
          <div className="justify-between card-actions">
            <FaSquareGithub size={40} />
            <FaRegNewspaper size={40} />
            <FaSquareXTwitter size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPage;