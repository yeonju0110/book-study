# 런타임 값 선언

- 선언 파일은 함수 또는 변수 같은 런타임 값을 생성하지 않을 수 있음
- `declare` 키워드를 사용해 이러한 구조체가 존재한다고 선언할 수 있음

  - 이렇게 하면 웹 페이지의 <script> 태그 같은 일부 외부 작업이 특정 타입의 이름을 사용해 값을 생성했음을 타입 시스템에 알림

#### `declare`로 변수를 선언하면 초깃값이 허용되지 않는다는 점을 제외하고 일반적인 변수 선언과 동일한 구문을 사용함

```ts
// types.d.ts
declare let declared: string; // Ok

declare let initializer: string = "Wanda"; // ❌ Error 초깃값 비허용
```

#### 함수와 클래스도 일반적인 형식과 유사하게 선언되지만 함수 또는 메서드의 본문이 없음

```ts
// fairies.d.ts
declare function canGrantWish(wish: string): boolean; // Ok

declare function grantWish(wish: string) {
  // ❌ Error: 본문 설정 불가
  return true;
};
```

#### 타입스크립트의 암시적 `any` 타입의 규칙은 일반 소스 코드와 마찬가지로 앰비언트 컨텍스트에 선언된 함수와 변수에 대해 동일하게 작동함

- 앰비언트 컨텍스트는 함수 본문이나 초기 변숫값을 제공하지 않을 수 있으므로 명시적 타입 애너테이션은 일반적으로 `any` 타입이 되는 것을 막는 유일한 방법임

#### `declare` 키워드를 사용한 타입은 `.d.ts` 선언 파일에서 사용하는 게 가장 일반적이지만, 선언 파일 외부에서도 사용할 수 있음

- 모듈 또는 스크립트 파일에서도 `declare` 키워드를 사용할 수 있음
- 전역으로 사용 가능한 변수가 해당 파일에서만 사용되어야 하는 경우 `declare` 키워드가 유용함

```ts
// index.ts
declare const myGlobalValue: string;

console.log(myGlobalValue); // Ok
```

#### 인터페이스와 같은 타입 형태는 `.d.ts`선언 파일에서 `declare` 키워드 유무와는 관계없이 허용됨

- 함수와 변수 같은 런타임 구문에 `declare` 키워드가 없다면 타입 오류가 발생

```ts
// index.d.ts
interface Writer {} // Ok
declare interface Writer {} // Ok

declare const fullName: string; // Ok
declare const firstName: "Liz"; // Ok

const lastName = "Lemon"; // ❌ Error
```

## 📍 1. 전역 변수

- `import` or `export` 문이 없는 타입스크립트 파일은 모듈이 아닌 스크립트로 취급됨
- 여기에 선언된 타입을 포함한 구문은 전역으로 사용됨
- 모든 파일에 걸쳐서 사용할 수 있는 전역 타입 또는 변수를 선언하는 데 특히 유용함

```ts
// globals.d.ts
declare const version: string;

// version.ts
export function logVersion() {
  console.log(`Version: ${version}`); // Ok
}
```

- 🚨 `.d.ts` 파일에 선언된 전역 타입에 자동으로 접근할 수 없는 경우 `.d.ts` 파일이 아무것도 가져오거나 내보내지 않는지 다시 확인해야 함
- 🚨 하나의 `export`로도 전체 파일을 더 이상 전역으로 사용할 수 없게 만들 수도 있음

## 📍 2. 전역 인터페이스 병합

- 인터페이스는 동일한 이름의 다른 인터페이스와 병합되기 때문에 `import`와 `export`문이 없는 `.d.ts` 선언 파일과 같은 전역 스크립트 컨텍스트에서 인터페이스를 선언하면 해당 인터페이스가 전역으로 확장됨

- 인터페이스 병합을 이용하면 `types/window.d.ts`와 같은 파일에서 `Window` 타입의 전역 `window`변수에 존재하는 변수를 선언할 수 있도록 허용함

```js
<script type="text/javascript">window.myVersion = "3.1.1";</script>
```

```ts
// types/window.d.ts
interface Window {
  myVersion: string;
}
```

```ts
// index.ts
export function logWindowVersion() {
  console.log(`Window version is: ${window.myVersion}`);
}
```

## 📍 3. 전역 확장

- 경우에 따라 모듈 파일에 선언된 타입이 전역으로 사용되어야 함
- `declare global`을 사용하여 전역 컨텍스트에 있다고 표시 가능

```ts
// types.d.ts
// (모듈 컨텍스트)

declare global {
  // (전역 컨텍스트)
}

// (모듈 컨텍스트)
```

```ts
// types/data.d.ts
export interface Data {
  // case 1
  version: string;
}

// types/globals.d.ts
import { Data } from "./data";

declare global {
  const globallyDeclared: Data; // case 2
}

declare const locallyDeclared: Data; // case 3

// index.ts
import { Data } from "./types/data";

function logData(data: Data) {
  // Ok
  console.log(`Data version is: ${data.version}`); // case 1
}

logData(globallyDeclared); // case 2 -> Ok
logData(locallyDeclared); // case 3 -> ❌ Error
```
