/**
 * 10.8 제네릭 올바르게 사용하기
 */

/**
 * 10.8.1 제네릭 황금률
 */
{
  // 👎🏻 Input이 한번만 사용되어서 의미없음
  //   function logInput<Input extends string>(input: Input) {
  //     console.log("Hi!", input);
  //   }
  //   👍🏻 그냥 안사용하는 것이 나음
  //   function logInput(input: string) {
  //     console.log("Hi!", input);
  //   }
}

/**
 * 10.8.2 제네릭 명명 규칙
 */
{
  // L, V가 뭔지 잘 모름
  //   function labelBox<L, V>(l: L, v: V) {
  //     /* ... */
  //   }
  // 좀 더 명확함
  //   function labelBox<Label, Value>(label: Label, value: Value) {
  //     /* ... */
  //   }
}
