# 선언 파일

- `.d.ts` 선언 파일은

  - 런타임 코드를 포함할 수 없다는 주목할 만한 제약 사항을 제외하고는 `.ts` 파일과 유사하게 작동함
  - 사용 가능한 런타임 값, 인터페이스, 모듈, 일반적인 타입의 설명만 포함됨
  - 자바스크립트로 컴파일할 수 있는 모든 런타임 코드를 포함할 수 없음

- 다른 타입스크립트 파일과 마찬가지로 `임포트`해서 사용할 수 있음
- 값이 아닌 타입만 선언할 수 있는 코드 영역을 의미하는 `앰비언트 컨텍스트`를 생성함 // TODO

```ts
// types.d.ts
export interface Character {
  catchphrase?: string;
  name: string;
}

// index.ts
import { Character } from "./types";

export const character: Character = {
  catchphrase: "Yee-haw!",
  name: "Sandy Cheeks",
};
```
