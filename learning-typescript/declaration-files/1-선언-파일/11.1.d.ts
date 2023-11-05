/**
 * 11.1 선언 파일
 */
// types.d.ts
// @ts-ignore
export interface Character {
  catchphrase?: string;
  name: string;
}

// index.ts
// @ts-ignore
import { Character } from "./types";

// @ts-ignore
export const character: Character = {
  catchphrase: "Yee-haw!",
  name: "Sandy Cheeks",
};
