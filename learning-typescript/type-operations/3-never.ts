/**
 * 🎁 15.3 never
 *
 * never: 가능한 값을 가질 수 없고 접근할 수 없음
 */

/**
 * 📍 15.3.1 never와 교차, 유니언 타입
 *
 * - 교차 타입(&)에 있는 never는 교차 타입을 never로 만듬
 * - 유니언 타입(|)에 있는 never는 무시됨
 */
{
  type NeverIntersection = never & string; // type: never
  type NeverUnion = never | string; // type: string
}

/**
 * 📍 15.3.2 never와 조건부 타입
 *
 * - 제네릭 조건부 타입은 일반적으로 유니언에서 '타입을 필터링'하기 위해 never를 사용함
 */
{
  type OnlyStrings<T> = T extends string ? T : never;

  type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>; // "red" | "blue" 가 됨
}

{
  // infer가 있는 타입 추론은 조건부 타입이 true가 되어야 하므로 false인 경우를 절대 사용하지 않아야 함 -> never 사용이 적합
  //   조건부 타입의 false에 never를 사용하면 FirstParameter가 함수의 첫 번째 매개변수의 타입을 추출할 수 있음
  type FirstParameter<T extends (...args: any[]) => any> = T extends (
    arg: infer Arg
  ) => any
    ? Arg
    : never;

  type GetsString = FirstParameter<(arg0: string) => void>; // type: string
}

/**
 * 📍 15.3.3 never와 매핑된 타입
 *
 * 유니언에서 never의 동작은 매핑된 타입에서 '멤버를 필터링'할 때도 유용
 * 다음 세 가지 타입 시스템 기능을 사용해 '객체의 키를 필터링'함 => 원래 키 or never로 변경하는 매핑된 타입을 만들 수 있음
 * - 유니언에서 never는 무시됨
 * - 매핑된 타입은 타입의 멤버를 매핑할 수 있음
 * - 조건부 타입은 조건이 충족되는 경우 타입을 never로 변환하는 데 사용할 수 있음

 *
 * 어렵꾼,,,,
 */
{
  type OnlyStringProperties<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
  }[keyof T];
  //   [keyof T]로 해당 타입의 멤버를 요청 -> 모든 매핑된 타입의 결과 유니언이 생성 => never는 필터링

  interface AllEventData {
    participants: string[];
    location: string;
    name: string;
    year: number;
  }

  type OnlyStringEventData = OnlyStringProperties<AllEventData>; // "location" | "name"
}
