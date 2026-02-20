export type UserCardWithSkills = {
  userId: string;
  name: string;
  description: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
  skills: string[];
};
