/**
 * 🎁 15.4 템플릿 리터럴 타입
 * : 문자열 타입이 패턴에 맞는지를 나타내는 ts 구문 -> 이런 것도 있었구나,,,
 */
{
  type Greeting = `Hello${string}`;

  let matches: Greeting = "Hello, world!"; // Ok

  // @ts-expect-error
  let outOfOrder: Greeting = "World! Hello!";

  // @ts-expect-error
  let missingAltogether: Greeting = "hi";
}

{
  type Brightness = "dark" | "light";
  type Color = "blue" | "red";

  type BrightnessAndColor = `${Brightness}-${Color}`;
  // "dark-red" | "light-red" | "dark-blue" | "light-blue"

  let colorOk: BrightnessAndColor = "dark-blue"; // Ok

  // @ts-expect-error
  let colorWrongStart: BrightnessAndColor = "medium-blue";
}

{
  // 모든 원시 타입도 허용 (symbol 제외)
  type ExtolNumber = `much ${number} wow`;

  function extol(extolee: ExtolNumber) {
    /* ... */
  }

  extol("much 0 wow");
  extol("much -7 wow");
  extol("much 9.001 wow");

  // @ts-expect-error
  extol("much false wow");
}

/**
 * 📍 15.4.1 고유 문자열 조작 타입
 * - ts는 문자열을 가져와 문자열에 일부 조작을 적용하는 제네릭 유틸리티 타입을 제공
 * - 종류
 *   1. Uppercase
 *   2. Lowercase
 *   3. Capitalize: 문자열 리터럴 타입의 첫 번째 문자를 '대문자'로 변환
 *   4. Uncapitalize: 문자열 리터럴 타입의 첫 번째 문자를 '소문자'로 변환
 */
{
  type FormalGreeting = Capitalize<"hello.">; // type: "Hello."
}

/**
 * 📍 15.4.2 템플릿 리터럴 키
 * - 템플릿 리터럴 타입은 문자열 리터럴을 사용할 수 있는 모든 위치에서 사용 가능
 */
{
  type DataKey = "location" | "name" | "year";

  type ExistenceChecks = {
    [K in `check${Capitalize<DataKey>}`]: () => boolean; // ✨
  };
  //   {
  //     checkLocation: () => boolean;
  //     checkName: () => boolean;
  //     checkYear: () => boolean;
  //   }
}

/**
 * 📍 15.4.3 매핑된 타입 키 다시 매핑하기
 * - 매핑된 타입에서 인덱스 시그니처에 대한 템플릿 리터럴 타입 다음에 ✨as✨ 키워드를 배치하면?
 *   => 결과 타입의 키는 템플릿 리터럴 타입과 일치하도록 변경됨
 *   => 즉, 매핑된 타입은 원래 값을 계속 참조 + 각 매핑된 타입 속성에 대한 다른 키도 가질 수 있음
 */
{
  interface DataEntry<T> {
    key: T;
    value: string;
  }

  type DataKey = "location" | "name" | "year";

  type DataEntryGetters = {
    [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
  };
  //   {
  //     getLocation: () => DataEntry<"location">;
  //     getName: () => DataEntry<"name">;
  //     getYear: () => DataEntry<"year">;
  //   }
}

{
  const config = {
    location: "unknown",
    name: "anonymous",
    year: 0,
  };

  //   keyof typeof를 사용해 해당 객체의 타입에서 매핑된 타입을 만들 수 있음
  type LazyValues = {
    [K in keyof typeof config as `${K}Lazy`]: () => Promise<(typeof config)[K]>;
  };
  //   {
  //     location: Promise<string>;
  //     name: Promise<string>;
  //     year: Promise<number>;
  //   }

  async function withLazyValues(configGetter: LazyValues) {
    await configGetter.locationLazy; // type: string

    // @ts-expect-error
    await configGetter.missingLazy();
  }
}

// 👀 Symbol 방지 전
{
  // js에서 객체 키는 string or Symbol이 될 수 있음 -> Symbol은 원시 타입이 아니기 때문에 에러
  type TurnIntoGettersDirect<T> = {
    // @ts-expect-error
    [K in keyof T as `get${K}`]: () => T[K];
  };
}
// 👀 Symbol 방지 후
{
  const someSymbol = Symbol("");

  interface HasStringAndSymbol {
    StringKey: string;
    [someSymbol]: number;
  }

  type TurnIntoGetters<T> = {
    // 교차 타입을 사용하여 문자열이 될 수 있는 타입만 사용하도록 강제
    // string & symbol = never
    [K in keyof T as `get${string & K}`]: () => T[K];
  };

  type GettersJustString = TurnIntoGetters<HasStringAndSymbol>;
  //   {
  //     getStringKey: () => string;
  //   }
}
