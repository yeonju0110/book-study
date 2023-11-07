# 패키지 타입

## 📍 1. 선언

- 타입스크립트는 입력된 파일에 대한 `.d.ts` 출력 파일과 자바스크립트 출력 파일을 함께 생성하는 선언 옵션을 제공함

```ts
// index.ts
export const greet = (text: string) => {
  console.log(`Hello, ${text}!`);
};

// module은 ex2015, target은 es2015인 선언 옵션을 사용해 다음 출력 파일을 생성함
// index.d.ts
export declare const greet: (text: string) => void;

// index.js
export const greet = (text) => {
  console.log(`Hello, ${text}!`);
};
```

- 자동으로 생성된 `.d.ts` 파일은 프로젝트에서 사용자가 사용할 타입 정의를 생성하는 가장 좋은 방법
- 일반적으로 `.js` 파일을 생성하는 타입스크립트로 작성된 대부분의 패키지도 해당 파일과 함께 `.d.ts`를 번들로 묶는 것이 좋음

## 📍 2. 패키지 타입 의존성

- 타입스크립트는 프로젝트의 `node_modules` 의존성 내부에서 번들로 제공되는 `.d.ts` 파일을 감지하고 활용할 수 있음.
- ex) 자체 `.d.ts`선언 파일과 함께 제공되는 npm 모듈의 파일 구조
  ```
  lib/
    index.js
    index.d.ts
  pacakge.json
  ```

## 📍 2. 패키지 타입 노출

- 프로젝트가 `npm`에 배포되고 사용자를 위한 타입을 제공하려면 패키지의 `package.json` 파일에 `types` 필드를 추가해 루트 선언 파일을 가리킴
- `types` 필드는 `main` 필드와 유사하게 작동하고 종종 동일한 것처럼 보이지만, `.js` 확장자 대신에 `.d.ts` 확장자를 사용함
