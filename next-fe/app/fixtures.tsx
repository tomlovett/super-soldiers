import type { Soldier, Mission } from "./types";

export const soldiers: Soldier[] = [
  {
    firstName: "Tom",
    lastName: "Segura",
    nationality: "PER",
    gender: "M",
    isAlive: true,
    userId: 1,
    nickname: "Tommy Buns",
    fighterClass: "Assault",
    exp: 623,
  },
  {
    firstName: "Joey",
    lastName: "Diaz",
    nationality: "CUB",
    gender: "M",
    isAlive: true,
    userId: 1,
    nickname: "CoCo",
    fighterClass: "Heavy",
    exp: 123,
  },
  {
    firstName: "Bobby",
    lastName: "Lee",
    nationality: "KOR",
    gender: "M",
    isAlive: false,
    userId: 1,
    nickname: null,
    fighterClass: "Sniper",
    exp: 0,
  },
];

export const missions: Mission[] = [{ name: "The Big Shebang" }];
