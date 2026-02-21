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
          <div>
            <h3 className="font-bold">自己紹介</h3>
            <p>{userCardWithSkills.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">好きな技術</h3>
            <ul className="flex gap-2">
              {userCardWithSkills.skills.map((s, index) => (
                <li key={index}>
                  {s}
                  {index !== userCardWithSkills.skills.length - 1 && ","}
                </li>
              ))}
            </ul>
          </div>

          <div className="justify-between card-actions">
            <a
              href={userCardWithSkills.githubId}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHubへ移動"
            >
              <FaSquareGithub size={36} aria-label="GitHubアイコン" />
            </a>
            <a
              href={userCardWithSkills.qiitaId}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Qiitaへ移動"
            >
              <FaRegNewspaper size={36} aria-label="Qiitaアイコン" />
            </a>
            <a
              href={userCardWithSkills.xId}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xへ移動"
            >
              <FaSquareXTwitter size={36} aria-label="Xアイコン" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPage;