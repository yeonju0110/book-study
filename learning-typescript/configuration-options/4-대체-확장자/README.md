# 🎁 대체 확장자

- 타입스크립트는 기본적으로 확장자가 `.ts`인 모든 파일을 읽을 수 있음
- 그러나 일부 프로젝트는 `json` 모듈 또는 리액트와 같은 UI 라이브러리를 위한 `JSX` 구문처럼 확장자가 다른 파일을 읽을 수 있어야 함

## 1. JSX 구문

- `<Comment />`와 같은 JSX 구문은 기술적으로 자바스크립트가 아님
- 파일에서 JSX 구문을 사용하기 위해 다음 두 가지를 수행해야 함
  1. 구성 옵션에서 'jsx' 컴파일러 옵션을 활성화하기
  2. .tsx 확장자로 파일의 이름을 지정

```js
const MyComponent = () => {
  // 다음과 같음:
  //   return React.createElement("div", null, "Hello, world!");
  return <div>Hello, world!</div>;
};
```

#### jsx

- 타입스크립트가 `.tsx` 파일에 대한 자바스크립트 코드를 내보내는 방법:
  `jsx` 컴파일러 옵션에 사용되는 값으로 결정됨

| 값             | 입력 코드 | 출력 코드                    | 출력 파일 확장자 |
| -------------- | --------- | ---------------------------- | ---------------- |
| "preserve"     | `<div />` | `<div />`                    | .jsx             |
| "react"        | `<div />` | `React.createElement("div")` | .js              |
| "react-native" | `<div />` | `<div />`                    | .jsx             |

#### .tsx 파일의 제네릭 화살표 함수

- 제네릭 화살표 함수의 구문이 JSX 구문과 충돌함

```ts
const identity = <T>(input: T) => input;
//
// Error: JSX element 'T' has no corresponding closing tag.
```

- 구문 모호성을 해결하기 위해 타입 인수에 `= unknown` 제약 조건을 추가할 수 있음

```ts
const identity = <T = unknown>(input: T) => input; // Ok
```

## 2. resolveJsonModule

- true로 설정하면 `.json` 파일을 읽을 수 있음
- 이렇게 하면 `.json` 파일을 마치 객체를 내보내는 `.ts` 파일인 것처럼 가져오고 해당 객체의 타입을 `const` 변수인 것처럼 유추

#### 객체가 포함된 JSON 파일이라면 `구조 분해 가져오기`를 사용할 수 있음

```json
{
  "activist": "Mary Astell"
}
```

```ts
// usesActivist.ts
import { activist } from "./activist.json";

// Logs: "Mary Astell"
console.log(activist);
```

#### array or number 같은 다른 리터럴 타입을 포함한 JSON 파일이라면 import 구문으로 `*`을 사용함

```json
// activists.json
["Ida B. Wells", "Sojourner Truth", "Tawakkul Karman"]
```

```ts
// useActivists.ts
import * as activists from "./activists.json";

console.log(`${activists.length} activists`);
```
