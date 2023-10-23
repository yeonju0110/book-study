/**
 * 10.2 제네릭 인터페이스
 */
{
  interface Box<T> {
    inside: T;
  }

  let stringyBox: Box<string> = {
    inside: "abc",
  };

  let numberBox: Box<number> = {
    inside: 123,
  };

  //   let incorrectBox: Box<number> = {
  //     inside: false, // ❌ Error: Type 'boolean' is not assignable to type 'number'.
  //   };
}

{
  interface Array<T> {
    pop(): T | undefined;

    push(...items: T[]): number;
  }
}

/**
 * 10.2.1 유추된 제네릭 인터페이스 타입
 */

{
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

  // let lastMismatch = getLast({
  //   next: {
  //     value: 123, // 유추된 Value 타입 인수: number
  //   },
  //   value: false, // ❌ Error: Type 'boolean' is not assignable to type 'number'.
  // });

  /**
   * 인터페이스가 타입 매개변수를 선언하는 경우, 해당 인터페이스를 참조하는 모든 타입 애너테이션은 이에 상응하는 타입 인수를 제공해야 함
   */
  {
    interface CrateLite<T> {
      contents: T;
    }

    // let missingGeneric: CrateLite = {
    //   inside: "??", // ❌ Error: Generic type 'CrateLite<T>' requires 1 type argument(s).
    // };
  }
}
