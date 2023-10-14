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
