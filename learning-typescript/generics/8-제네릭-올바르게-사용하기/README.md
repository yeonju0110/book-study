# 🚪 제네릭 올바르게 사용하기

필요할 때만 제네릭을 사용하고, 제네릭을 사용할 때는 무엇을 위해 사용하는지 명확히 하자.

## 📍 1. 제네릭 황금률

- 함수에 타입 매개변수가 필요한지 여부를 판단할 수 있는 간단하고 빠른 방법
  - 타입 매개변수가 최소 두 번 이상 사용되었는지 확인하는 것

```ts
// 👎🏻 Input이 한번만 사용되어서 의미없음
function logInput<Input extends string>(input: Input) {
  console.log("Hi!", input);
}

//   👍🏻 그냥 안사용하는 것이 나음
function logInput(input: string) {
  console.log("Hi!", input);
}
```

## 📍 2. 제네릭 명명 규칙

- 타입 매개변수에 대한 표준 명명 규칙

  - 기본적으로 첫 번째 타입 인수로 T를 사용
  - 후속 타입 매개변수가 존재하면 U, V 등을 사용하는 것

- 맥락과 관련된 정보가 알려진 경우, 해당 용어의 첫 글자를 사용하는 것으로 확장된
  - 상태 관리 라이브러리에서는 제네릭 상태를 S로
  - 데이터 구조의 키와 값은 K와 V로
- 그러나, 하나의 문자를 사용하는 타입 인수명은 혼란스러울 수 있음
  - 단일 문자 T에서 명확한 의도를 알 수 없는 경우는 설명적인 이름을 사용하는 것이 좋음

```ts
// L, V가 뭔지 잘 모름
function labelBox<L, V>(l: L, v: V) {
  /* ... */
}

// 좀 더 명확함
function labelBox<Label, Value>(label: Label, value: Value) {
  /* ... */
}
```
