import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    gender: "",
    startDtm: new Date().getTime(),
  },
});

export const userAnswer = atom({
  key: "userAnswer",
  default: {
    username: "",
    gender: "",
    startDtm: "",
  },
});

export const userReport = atom({
  key: "userReport",
  default: {},
});
