# 🍮 제한된 제네릭 타입

- 기본적으로 제네릭 타입에는 클래스, 인터페이스, 원싯값, 유니언, 별칭 등 모든 타입을 제공할 수 있음
- 그러나 일부 함수는 제한된 타입에서만 작동해야 함

#### ✔️ length를 가진 모든 타입을 받아들일 수 있도록 구현

- ✅: 문자열, 배열 등
- ❌: Date 등

```ts
interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}

logWithLength("No one can figure out your worth but you."); // type: string
logWithLength([false, true]); // type: boolean[]
logWithLength({ length: 123 }); // type: { length: number }

logWithLength(new Date()); // ❌ length property가 없어서 안됨
```

## 📍 1. keyof와 제한된 타입 매개변수

```ts
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost", "Burn", "Nomadland"],
};

const favorite = get(roles, "favorite"); // type: string
const others = get(roles, "others"); // type: string[]

const missing = get(roles, "extras"); // ❌ favorite, others만 가능
```

- 위와 달리 아래는 key 매개변수가 모든 keyof T일 수 있음 -> 구체적이지 X

```ts
// 👎🏻 bad
function get<T>(container: T, key: keyof T) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost", "Burn", "Nomadland"],
};

const found = get(roles, "favorite"); // type: string | string[] 💩
```
