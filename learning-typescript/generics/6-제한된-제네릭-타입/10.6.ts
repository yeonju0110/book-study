/**
 * 10.6 제한된 제네릭 타입
 */

{
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

  //   logWithLength(new Date()); // ❌ length property가 없어서 안됨
}

/**
 * 10.6.1 keyof와 제한된 타입 매개변수
 */
{
  // 👍🏻 good 구체적
  function get<T, Key extends keyof T>(container: T, key: Key) {
    return container[key];
  }

  const roles = {
    favorite: "Fargo",
    others: ["Almost", "Burn", "Nomadland"],
  };

  const favorite = get(roles, "favorite"); // type: string
  const others = get(roles, "others"); // type: string[]

  //   const missing = get(roles, "extras"); // ❌ favorite, others만 가능
}

{
  // 👎🏻 bad
  function get<T>(container: T, key: keyof T) {
    return container[key];
  }

  const roles = {
    favorite: "Fargo",
    others: ["Almost", "Burn", "Nomadland"],
  };

  const found = get(roles, "favorite"); // type: string | string[] 💩
}
