/**
 * 🎁 15.2 조건부 타입
 *
 * 기존 타입을 바탕으로 두 가지 가능한 타입 중 하나로 확인되는 타입
 */
{
  // EX) string 타입을 number타입에 할당할 수 있는지 여부
  type CheckStringAgainstNumber = string extends number ? true : false;
}

/**
 * 15.2.1 제네릭 조건부 타입
 *
 * 모든 다른 타입을 기반으로 새로운 타입을 생성하기 위해 사용
 */
{
  type CheckAgainstNumber<T> = T extends number ? true : false;

  //   type: false
  type CheckString1 = CheckAgainstNumber<"parakeet">;
  //   type: true
  type CheckString2 = CheckAgainstNumber<1891>;
  //   type: true
  type CheckString3 = CheckAgainstNumber<number>;
}

{
  // 제네릭 T를 받고 T가 함수인지 아닌지 확인
  type CallableSetting<T> = T extends () => any ? T : () => T;

  //   type: () => number[]; -> 함수임
  type GetNumbersSetting = CallableSetting<() => number[]>;

  //   type: () => string -> 함수가 아님 -> () => T 로 타입 변경됨
  type StringSetting = CallableSetting<string>;
}

{
  interface QueryOptions {
    throwIfNotFound: boolean;
  }

  //   Options["throwIfNotFound"]가 true인 것으로 명확하게 알려지면 string | undefined 대신 더 좁은 string이 되도록 모델링함
  type QueryResult<Options extends QueryOptions> =
    Options["throwIfNotFound"] extends true ? string : string | undefined;

  // @ts-ignore
  declare function retrieve<Options extends QueryOptions>(
    key: string,
    options?: Options
  ): Promise<QueryResult<Options>>;

  // @ts-ignore
  // 반환된 타입: string | undefined
  await retrieve("Birute");

  // @ts-ignore
  // 반환된 타입: string | undefined
  await retrieve("Jane", { throwIfNotFound: Math.random() > 0.5 });

  // @ts-ignore
  // 반환된 타입: string
  await retrieve("Dian", { throwIfNotFound: true });
}

/**
 * 15.2.2 타입 분산
 *
 * 조건부 타입은 유니언에 '분산'됨. = 결과 타입은 각 구성 요소에 조건부 타입을 적용하는 유니언이 됨
 * ConditionalType<T | U> = Conditional<T> | Conditional<U>
 */
{
  type ArrayifyUnlessString<T> = T extends string ? T : T[];

  //   type: string | number[]
  type HalfArrayified = ArrayifyUnlessString<string | number>;
  //   🤔 만약 ts의 조건부 타입이 유니언에 분산되지 않는다면?
  //   string | number는 string에 할당할 수 없기 때문에 (string | number)[]가 됐을 것,,,
}

/**
 * 15.2.3 유추된 타입
 *
 * 조건부 타입은 extends 절에 infer 키워드를 사용해 조건의 임의의 부분에 접근함
 * extends절에 타입에 대한 infer 키워드와 새 이름을 배치하면 조건부 타입이 true인 경우 새로운 타입을 사용할 수 있음을 의미
 */
{
  type ArrayItems<T> = T extends (infer Item)[] ? Item : T;

  //   type: string
  type StringItem = ArrayItems<string>;

  //   type: string
  type StringArrayItem = ArrayItems<string[]>;

  //   type: string[]
  type String2DItem = ArrayItems<string[][]>;
}

{
  // 재귀적 조건부 타입
  type ArrayItemsRecursive<T> = T extends (infer Item)[]
    ? ArrayItemsRecursive<Item>
    : T;

  // type: string
  type StringItem = ArrayItemsRecursive<string>;

  // type: string
  type StringArrayItem = ArrayItemsRecursive<string[]>;

  // type: string
  type String2DItem = ArrayItemsRecursive<string[][]>;
}

/**
 * 15.2.4 매핑된 조건부 타입
 *
 * 매핑된 타입 + 조건부 타입
 */
{
  type MakeAllMembersFunctions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : () => T[K];
  };

  type MemberFunctions = MakeAllMembersFunctions<{
    alreadyFunction: () => string;
    notYetFunction: number;
  }>;
  // type:
  // {
  //   alreadyFunction: () => string,
  //   notYetFunction: () => number,
  // }
}
