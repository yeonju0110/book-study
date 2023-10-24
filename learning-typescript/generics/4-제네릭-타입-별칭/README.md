# 📮 제네릭 타입 별칭

제네릭 타입 별칭은 일반적으로 제네릭 함수의 타입을 설명하는 함수와 함께 사용됨

```ts
type Nullish<T> = T | null | undefined;
```

```ts
type CreatesValue<Input, Output> = (input: Input) => Output;

let creator: CreatesValue<string, number>;

creator = (text) => text.length; // ✅

creator = (text) => text.toUpperCase(); // ❌ Output이 number여야하는데 string임
```

## 📍 1. 제네릭 판별된 유니언

- EX. 제네릭 '결과' 타입

```ts
type Result<Data> = FailureResult | SuccessfulResult<Data>;

interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    console.log(`We did it! ${result.data}`);
  } else {
    console.error(`Awww...${result.error}`);

    result.data; // ❌ Error
  }
}
```
