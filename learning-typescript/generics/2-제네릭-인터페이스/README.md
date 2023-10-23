# 🧬 제너릭 인터페이스

- 인터페이스도 제너릭으로 선언할 수 있음

```ts
interface Box<T> {
  inside: T;
}

let stringyBox: Box<string> = {
  inside: "abc",
};

let numberBox: Box<number> = {
  inside: 123,
};

let incorrectBox: Box<number> = {
  inside: false, // ❌ Error: Type 'boolean' is not assignable to type 'number'.
};
```

- 타입스크립트에서 내장 **Array 메서드**는 제너릭 인터페이스로 정의됨

```ts
interface Array<T> {
  /**
   * 배열에서 마지막 요소를 제거하고 그 요소를 반환
   * 배열이 비어있는 경우 -> undefined 반환
   */
  pop(): T | undefined;

  /**
   * 배열의 끝에 새로운 요소를 추가 + 배열의 길이 반환
   */
  push(...items: T[]): number;
}
```

## 📍 유추된 제너릭 인터페이스 타입

#### ✔️ 제너릭 타입 위치에 제공된 값의 타입으로 -> 타입 인수를 유추

```ts
interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

let lastDate = getLast({
  value: new Date("09-13-1993"), // 유추된 Value 타입 인수: Date
});

let lastFruit = getLast({
  next: {
    value: "banana", // 유추된 Value 타입 인수: String
  },
  value: "apple",
});

let lastMismatch = getLast({
  next: {
    value: 123, // 유추된 Value 타입 인수: number
  },
  value: false, // ❌ Error: Type 'boolean' is not assignable to type 'number'.
});
```

#### ✔️ 인터페이스가 타입 매개변수를 선언하는 경우

- 해당 인터페이스를 참조하는 모든 타입 애너테이션은 이에 상응하는 타입 인수를 제공해야 함

```ts
interface CrateLite<T> {
  contents: T;
}

let missingGeneric: CrateLite = {
  inside: "??", // ❌ Error: Generic type 'CrateLite<T>' requires 1 type argument(s).
};
```
