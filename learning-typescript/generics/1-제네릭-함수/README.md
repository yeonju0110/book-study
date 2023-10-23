# 🌳 제너릭 함수

- 매개변수 괄호 바로 앞에 홑화살괄호(<,>)로 묶인 타입 매개변수에 별칭을 배치해 함수를 제너릭으로 만듬
- 그러면 해당 타입 매개변수를 함수의 본문 내부의 매개변수 타입 애너테이션, 반환 애너테이션, 타입 애너테이션에서 사용할 수 있음

```ts
function identity<T>(input: T) {
  return input;
}

const arrowIdentity = <T>(input: T) => input;

const numeric = identity("me"); // type: "me"
const stringy = arrowIdentity(123); // type: 123
```

## 📍 명시적 제너릭 호출 타입

- 명시적 제네릭 타입 인수 사용 -> 기본값이 unknown으로 설정되는 것을 피할 수 있음

```ts
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// type: (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

// type: (input: unknown) => void
logWrapper((input) => {
  console.log(input.length); // ❌ Error: 'input' is of type 'unknown'
});

// 명시적 제너릭 타입 인수 사용 -> 기본값이 unknown으로 설정되는 것을 피할 수 있음
// type: (input: string) => void
logWrapper<string>((input) => {
  console.log(input.length); // ✅
});

// type: (input: string) => void
logWrapper<string>((input: string) => {
  console.log(input.length); // ✅
});
```

## 📍 다중 함수 타입 매개변수

- 쉼표로 구분해 함수를 정의

```ts
function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // value: readonly [boolean, string] type
```

- 함수가 **여러 개**의 타입 매개변수를 선언하면 해당 함수에 대한 호출은 명시적으로 제너릭 타입을 **모두** 선언하지 않거나 **모두** 선언해야 함
  - 아직 제너릭 호출 중 **일부 타입만을 유추하지는 못함**
- 제너릭 구조체에서 두 개보다 많은 타입 매개변수 사용하지 말 것
  - 런타임 함수 매개변수처럼 많이 사용할수록 코드를 읽고 이해하는 것이 점점 더 어려워지기 때문

```ts
function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

makePair("abc", 123); // ✅ 둘 다 제공되지 않음

makePair<string, number>("abc", 123); // ✅ 둘 다 제공됨
makePair<"abc", 123>("abc", 123); // ✅ 둘다 제공됨

makePair<string>("abc", 123); // ❌ 일부만 제공
```
