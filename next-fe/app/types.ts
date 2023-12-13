export type Mission = {
  name: string;
};

export type Soldier = {
  firstName: string;
  lastName: string;
  nationality: string;
  gender: string;
  isAlive: boolean;
  userId?: number;
  nickname: string | null;
  fighterClass: string;
  exp: number;
};
