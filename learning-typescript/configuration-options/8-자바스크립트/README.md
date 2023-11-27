# 자바스크립트

- ts는 기본적으로 .js 또는 .jsx 확장자를 가진 파일을 무시
- `allowJs`와 `checkJs` 컴파일러 옵션을 사용하면 js 파일을 읽고, 컴파일하고, 제한된 기능이지만 타입 검사도 할 수 있음

## 1. allowJs

- js 파일에 선언된 구문을 ts 파일에서 타입 검사를 하도록 허용
- .jsx 컴파일러 옵션과 결합하면 .jsx 파일도 검사할 수 있음

```ts
// index.ts
import { value } from "./values";
// allowJs가 활성화되면 가져온 value는 string 타입이 됨 -> 오류 없어짐
// TODO 근데 난 안없어짐 ㅎ 왜지.

console.log(`Quote: ${value.toUpperCase()}`);
```

```js
// values.js
export const value = "We cannot succeed when half of us are held back.";
```

## 2. checkJs

- allowJs 옵션이 아직 true가 아니라면 기본값을 true로 설정하기
- .js와 .jsx 파일에서 타입 검사기 활성화해주는 옵션!

```js
// index.js
let myQuote = "Each person must live.";

console.log(quote); // ❌ Error: Cannot find name -> 활성화시 검사해 줌
```

#### @ts-check

- 파일 상단에 `// @ts-check` 주석을 사용해 파일별로 checkJs를 활성화
- 해당 js 파일에 대해서만 checkJs 옵션이 활성화

## 3. JSDoc 지원

- allowJs와 checkJs가 활성화되면 ts는 코드의 모든 JSDoc 정의를 인식함

```js
// index.js

/**
 * @param {string} text
 */
function sentenceCase(text) {
  return `${text[0].toUpperCase()} ${text.slice(1)}.`;
}

sentenceCase("hello world"); // Ok
sentenceCase(["hello", "world"]); // ❌ Error: string[] !== string
```

- `checkJs`가 활성화되면 string[]을 전달하는 것에 대해서는 타입 오류가 보고되어야 한다는 것을 알게됨
