# 👮‍♂️ Promise

## 📍 1. Promise 생성

- 타입스크립트에서 Promise 생성자는 단일 매개변수를 받도록 작성됨
- 대략 아래와 같이 생김
  ```ts
  class PromiseLike<Value> {
    constructor(
      executor: (
        resolve: (value: Value) => void,
        reject: (reason: unknown) => void
      ) => void
    ) {
      /* ... */
    }
  }
  ```

#### ✔️ 값을 resolve하려는 Promise를 만들려면 Promise의 타입 인수를 명시적으로 선언해야 함

- 명시적 제네릭 타입 인수가 없다면 기본적으로 매개변수 타입을 unknown으로 가정함

```ts
// type: Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// type: Promise<string>
const resolvesString = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});
```

#### ✔️ .then 메서드는 Promise의 resolve된 값을 나타내는 새로운 타입 매개변수를 받음

```ts
// type: Promise<string>
const textEventually = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

//   type: Promise<number>
const lengthEventually = textEventually.then((text) => text.length);
```

## 📍 2. async 함수

#### ✔️ async 키워드를 사용해 선언한 모든 함수 -> Promise를 반환

- Thenable이 아닌 경우, Promise로 래핑됨

```ts
// type: (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}

//   type: (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length; // 직접 number를 반환
}
```

#### ✔️ 명시적으로 언급하지 않더라도 async 함수에서 수동으로 선언된 반환 타입은 항상 Promise 타입이 됨

```ts
async function givesPromiseForString(): Promise<string> {
  return "Done!";
}

async function givesString(): string {
  // ❌ Promise<string>임
  return "Done!";
}
```
