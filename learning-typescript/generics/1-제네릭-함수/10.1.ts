/**
 * 10.1 제네릭 함수
 */
{
  function identity<T>(input: T) {
    return input;
  }

  const arrowIdentity = <T>(input: T) => input;

  const numeric = identity("me"); // type: "me"
  const stringy = arrowIdentity(123); // type: 123
}

/**
 * 10.1.1 명시적 제네릭 호출 타입
 */
{
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
    // console.log(input.length); // ❌ Error: 'input' is of type 'unknown'
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
}

/**
 * 10.1.2 다중 함수 타입 매개변수
 */
{
  function makeTuple<First, Second>(first: First, second: Second) {
    return [first, second] as const;
  }

  let tuple = makeTuple(true, "abc"); // value: readonly [boolean, string] type

  function makePair<Key, Value>(key: Key, value: Value) {
    return { key, value };
  }

  makePair("abc", 123);

  makePair<string, number>("abc", 123);
  makePair<"abc", 123>("abc", 123);

  //   makePair<string>("abc", 123); // ❌ Error: Expected 2 type arguments, but got 1.
}
