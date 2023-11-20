# 🎁 타입 검사

- 대부분의 타입스크립트 구성 옵션은 타입 검사기를 제어함

1. 구성 옵션을 느슨하게 구성 -> 오류가 완전히 확실할 때만 타입 검사 오류를 보고
2. 구성 옵션을 엄격하게 구성 -> 거의 모든 코드를 올바르게 잘 입력하도록 요구

## 1. lib

- ts가 런타임 환경에 있다고 가정하는 전역 API는 `lib` 컴파일러 옵션으로 구성할 수 있음

- lib 설정을 변경하는 유일한 이유:
  - 브라우저에서 실행되지 않는 프로젝트에서 기본으로 포함된 dom을 제거하기 위함

```json
{
  "compilerOptions": {
    "Lib": ["es2020"]
  }
}
```

- 최신 js API를 지원하기 위해 polyfill을 사용하는 프로젝트에서 lib 컴파일러 옵션을 사용해 dom과 ECMA스크립트 특정 버전을 포함할 수 있음

```json
{
  "compilerOptions": {
    "Lib": ["dom", "es2020"]
  }
}
```

- 🚨 올바른 런타임 폴리필을 모두 제공하지 않는 상태에서는 lib을 수정하지 않도록 주의
- TODO 💡 lib: 내장된 언어 API를 타내는 데 사용 / target: 존재하는 구문 기능을 나타내는 데 사용 (????!!!!!)

## 2. skipLibCheck

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

- 소스 코드에 명시적으로 포함되지 않은 선언 파일에서 타입 검사를 건너뛰도록 함
- 공유된 라이브러리의 정의가 서로 다르고 충돌할 수 있는 패키지 의존성을 많이 사용하는 애플리케이션에 유용함
- 타입 검사 일부를 건너뛰는 작업 -> ts 성능 개선 -> 대부분의 프로젝트에서 활성화하는 것이 좋음 ✨

## 3. 엄격 모드

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

- 기본적으로 `false`임
- 엄격 옵션 중에 `noImplicitAny`와 `stringNullChecks`는 타입 안전 코드를 적용하는데 유용

```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "strict": true
  }
}
```

- `noImplicitAny`를 제외한 모드 엄격 모드를 활성화

#### noImplicitAny

- 암시적 any로 대체될 때 타입스크립트에 타입 검사 오류가 발생하도록 지시
  - ts가 매개변수 또는 속성의 타입을 유추할 수 없는 경우라면 any 타입으로 가정함
  - any 타입은 타입 검사를 대부분 우회 -> 허용하지 않는 것이 좋음

#### strictBindCallApply

- 타입스크립트가 처음 출시되었을 때 내장된 `Function.apply`, `Function.bind`, `Function.call` 함수 유틸리티를 나타낼 수 있을 만큼 충분한 타입 시스템 기능이 없었음
  - 해당 함수의 인수 목록에 대해 any를 사용해야 했음
- 해당 옵션을 활성화하면 인수 목록에 대해 더 정확한 타입 사용 가능! => 활성화해두기! ✨

```ts
function getLength(text: string, trim?: boolean) {
  return trim ? text.trim().length : text.length;
}

// 비활성화 시: (this.Arg: Function, argArray?: any) => any;
getLength.apply;

// 활성화 시: (this.Arg: typeof getLength, args?: [text: string, trim?: boolean]) => number;
getLength.apply;
```

#### strictFunctionTypes

- 함수 매개변수 타입을 약간 더 엄격하게 검사

```ts
function checkOnNumber(containsA: (input: number | string) => boolean) {
  return containsA(1337);
}

function stringContainsA(input: string) {
  return !!input.match(/a/i);
}

// 활성화 시: Error ( string ) != ( string | number )
checkOnNumber(stringContainsA);
```

#### strictNullChecks

- 비활성화시, 코드의 모든 타입에 `null | undefined`가 추가되고 모든 변수가 `null` 또는 `undefined`를 받을 수 있도록 허용함
- 활성화하기! ✨

```ts
let value: string;

value = "abc123"; // Ok

value = null; // 활성화 시: Error (null) != string
```

#### strictPropertyInitialization

- 초기화가 없고, 생성자에 확실하게 할당되지 않은 클래스 속성에서 타입 오류를 발생시킴
- 활성화하기 ! ✨

#### useUnknownInCatchVariables

- 기본 catch 절 error 타입을 unknown으로 변경함
  - 발생한 오류가 Error 클래스의 인스턴스라는 보장은 없음
  - 사용자가 작성한 throw문이나 undefined에서 속성을 읽는 것과 같은 극단적인 경우에 여러 오류를 발생시킴

##### 오류는 그 어떤 것도 될 수 있으므로 ts는 오류의 기본 동작으로 any 타입 제공

```ts
try {
  someExternalFunction();
} catch (error) {
  error; // 기본 타입: any
}
```

- any 사용과 마찬가지로 오류를 억지로 명시적 타입 어서션 or 내로잉하는 비용보다 `unknown`으로 처리하는 것이 기술적으로 더 타당함

```ts
try {
  someExternalFunction();
} catch (error: unknown) {
  error; // 타입: unknown
}
```
