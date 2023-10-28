/**
 * 10.5 제네릭 제한자
 */

/**
 * 10.5.1 제네릭 기본값
 */
{
  interface Quote<T = string> {
    value: T;
  }

  let explicit: Quote<number> = { value: 123 };

  let implicit: Quote = {
    value: "Be yourself. The world worships the original.",
  };

  //   let mismatch: Quote = {
  //     value: 123, // ❌ 기본값이 string임
  //   };
}

{
  interface KeyValuePair<Key, Value = Key> {
    key: Key;
    value: Value;
  }

  // type: KeyValuePair<string, number>
  let allExplicit: KeyValuePair<string, number> = {
    key: "rating",
    value: 10,
  };

  // type: KeyValuePair<string, string>
  let oneDefaulting: KeyValuePair<string> = {
    key: "rating",
    value: "ten",
  };

  //   let firstMissing: KeyValuePair = { // ❌ key type은 지정해줘야함
  //     key: "rating",
  //     value: 10,
  //   };
}

{
  function inTheEnd<First, Second, Third = number, Fourth = string>() {} // ✅

  //   function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {} // ❌ 기본값이 없는 제네릭 타입은 기본값이 있는 제네릭 타입 뒤에 오면 안됨
}
