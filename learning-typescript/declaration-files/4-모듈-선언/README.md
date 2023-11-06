# 모듈 선언

- 모듈의 문자열 이름 앞에 `declare` 키워드를 사용하면 모듈의 내용을 타입 시스템에 알릴 수 있음
- 🚨 코드에서 `declare module`을 자주 사용해서는 안됨
  - 주로 와일드카드 모듈 선언과 패키지 타입과 함께 사용됨

```ts
// modules.d.ts
declare module "my-example-lib" {
  export const value: string;
}

// index.ts
import { value } from "my-example-lib";

console.log(value); // Ok
```

## 📍 1. 와일드카드 모듈 선언

- 모듈 선언으로 하나의 \* 와일드 카드를 포함해 해당 패턴과 일치하는 모든 모듈을 나타낼 수 있음.

#### EX

- `create-react-app`, `create-next-app` 과 같은 리액트 스타터에 미리 구상된 것처럼 많은 웹 프로젝트는 CSS 모듈을 지원하며 CSS 파일에서 런타임에 사용할 수 있는 객체로 스타일을 가져옴

- 기본적으로 `{ [i: string]: string }` 타입의 객체를 내보내는 "\*.module.css"와 같은 패턴으로 모듈을 정의함

```ts
// styles.d.ts
declare module "*.module.css" {
  const styles: { [i: string]: string };
  export default styles;
}

// component.ts
import styles from "./styles.module.css";

styles.anyClassName; // type: string
```

- 🚨 와일드카드 모듈을 사용해 로컬 파일을 나타내는 방식이 타입 안정성을 완벽히 보장하지는 않음
