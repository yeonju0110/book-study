# 💭 까먹지 말라고 적어두는 곳

## 🎀 13.4.2 tsconfig - resolveJsonModule

- true로 설정하면 `.json` 파일을 읽을 수 있음
- 이렇게 하면 `.json` 파일을 마치 객체를 내보내는 `.ts` 파일인 것처럼 가져오고 해당 객체의 타입을 `const` 변수인 것처럼 유추

1. 객체가 포함된 JSON 파일 => `구조 분해 가져오기`를 사용할 수 있음

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

2. array or number 같은 다른 리터럴 타입을 포함한 JSON 파일 => import 구문으로 `*`을 사용함

```json
["Ida B. Wells", "Sojourner Truth", "Tawakkul Karman"]
```

```ts
// useActivists.ts
import * as activists from "./activists.json";

console.log(`${activists.length} activists`);
```

## 🎀 13.5.2 tsconfing - target

- target을 적어도 "es2019" 이상으로 지정하지 않을 이유가 없음
  - 2022년 전 세계 사용자의 0.1% 이상을 서비스하는 브라우저의 모든 배포 버전이 최소한 ECMA 스크립트 2019 ~ 2021을 지원하기 때문.
  - LTS 지원 버전의 Node.js도 ECMA스크립트 2021을 지원함

## 🎀 15.1.1 type operations - 매핑된 타입

- 각 멤버에 전부 | null 을 추가하는 법

```ts
  interface BirdVariants {
    dove: string;
    eagle: boolean;
  }

  type NullableBirdVariants = {
    [K in keyof BirdVariants]: BirdVariants[K] | null;
  };

  //   다음과 같음:
  //   {
  //     dove: string | null;
  //     eagle: boolean | null;
  //   }
}
```

- 유틸리티 타입 확인해보기 (https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 🎀 15.3 never

1. 교차, 유니언 타입

```ts
type NeverIntersection = never & string; // type: never
type NeverUnion = never | string; // type: string
```

2. 조건부 타입

```ts
type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>; // "red" | "blue" 가 됨
```

3. 매핑된 타입

```ts
type OnlyStringProperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
//   [keyof T]로 해당 타입의 멤버를 요청 -> 모든 매핑된 타입의 결과 유니언이 생성 => never는 필터링

interface AllEventData {
  participants: string[];
  location: string;
  name: string;
  year: number;
}

type OnlyStringEventData = OnlyStringProperties<AllEventData>; // "location" | "name"
```

## 🎀 Record Type vs Index Signature

### Index Signature

- 대괄호로 객체를 접근하는 방법
- 장점: name이라는 key가 의도를 명확하게 표현하기 때문에 좋음
- 단점: 문자열 리터럴을 key로 사용하는 경우 오류 발생
  - ex. [name: 'apple' | 'banana']: number // Error

```ts
type Fruit = {
  [name: string]: number;
};

let fruit: Fruit = {
  apple: 10,
  banana: 20,
  lemon: 5,
};
```

### Record Type

- 장점: 문자열 리터럴을 key로 허용함

```ts
type Fruit = Record<string, number>;

let fruit: Fruit = {
  apple: 10,
  banana: 20,
  lemon: 5,
};
```

```ts
type names = 'apple' | 'banana' | 'lemon';

type Fruit = Record<names, number>

let fruit: Fruit = {
  'apple':
}
```

#### keyof & Record

- keyof 키워드: 타입 또는 인터페이스에 존재하는 모든 키 값을 union형태로 가져옴 ✨✨✨

```ts
type keyType = {
  a: string;
  b: number;
};

type Key = keyof keyType; // "a" | "b"
```

- keyof & record

```ts
type person = {
  name: string;
  age: number;
  address: string;
};

type PersonRecord = Record<keyof person, string>;

let human: PersonRecord = {
  name: "jane",
  age: "10",
  address: "seoul",
};
```

## 🎀 유틸리티 타입

### Parameters<T>

- 함수 타입 T의 매개변수 타입을 튜플 타입으로 정의한다.

```ts
declare function createCat(cat: { color: string; legs: number }): void;
type catParams = Parameters<typeof createCat>;
// [{color: string, legs: number}]
```

### ReturnType<T>

- 함수 T의 반환 타입으로 정의한다.

```ts
declare function createCat(): Cat;
type catResult = ReturnType<typeof createCat>;
// Cat
```

### Required<T>

- T의 모든 속성이 필수인 타입을 만듬
- optional로 설정한 속성도 반드시 가지고 있어야 함

```ts
interface User {
  name: string;
  password?: string;
}

const userData: User = { name: "Jane" }; // Ok
const userLogin: Required<User> = { name: "Jane" }; // Error
```

## 🎀 2.3 타입 애네테이션

```jsx
let rocker: string;
rocker = "Joan Jett";
```

- 초기값을 할당하지 않고도 변수의 타입을 선언할 수 있는 구문
- 런타임 코드에 영향을 주지 않음

### 📍 불필요한 타입 애네테이션

```jsx
let firstName: string = "Tina";
```

- string 타입 애너테이션 중복
  - ts가 이미 firstName이 string 타입임을 유추할 수 있기 때문
- 수동적으로 작성하는 일은 번거롭 but, 때로는 유용할지도

## 🎀 2.4 타입 형태

1. 모듈: export 또는 import가 있는 파일
2. 스크립트: 모듈이 아닌 모든 파일
   ⇒ ts에서는 스크립트면 해당 파일을 전역 스코프로 간주
