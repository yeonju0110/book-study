/**
 * 🎁 15.1 매핑된 타입
 *
 * 타입스크립트는 다른 타입의 속성을 기반으로 새로운 타입을 생성하는 구문을 제공함
 * 즉, 하나의 타입에서 다른 타입으로 매핑함
 *
 * 장점: 멤버 집합을 한 번 정의하고 필요한 만큼 여러 번 새로운 버전을 다시 생성할 수 있음
 */

/**
 * 매핑된 타입은 [i: string]과 같이 :를 사용한 정적 키 타입을 사용하는 대신,
 * [K in OriginalType]과 같이 in을 사용해 다른 타입으로부터 계산된 타입을 사용함
 */
{
  type Animals = "alligator" | "baboon" | "cat";

  type AnimalCounts = {
    [K in Animals]: number;
  };

  //   다음과 같음:
  //   {
  //     alligator: number;
  //     baboon: number;
  //     cat: number;
  //   }
}

/**
 * 📍 15.1.1 타입에서 매핑된 타입
 *
 * 일반적으로 매핑된 타입은 존재하는 타입에 keyof 연산자를 사용해 키를 가져오는 방식으로 작동
 * 존재하는 타입의 키를 매핑하도록 타입에 지시하면 새로운 타입으로 매핑함
 */
{
  interface AnimalVariants {
    alligator: boolean;
    baboon: number;
    cat: string;
  }

  type AnimalCounts = {
    [K in keyof AnimalVariants]: number;
  };

  //   다음과 같음:
  //   {
  //     alligator: number;
  //     baboon: number;
  //     cat: number;
  //   }
}

/**
 * 원본 객체가 SomeName이고 매핑이 [K in keyof SomeName]인 경우
 * => 매핑된 타입의 각 멤버는 SomeName 멤버의 값을 SomeName[K]로 참조할 수 있음
 */
{
  interface BirdVariants {
    dove: string;
    eagle: boolean;
  }

  type NullableBirdVariants = {
    [K in keyof BirdVariants]: BirdVariants[K] | null; // 각 멤버에 `| null`을 추가함
  };

  //   다음과 같음:
  //   {
  //     dove: string | null;
  //     eagle: boolean | null;
  //   }
}

/**
 * 👀 매핑된 타입과 시그니처
 *
 * 시그니처 뜻? 함수의 형태를 결정하는 요인들. (*mdn 참고)
 *
 * 복습! 인터페이스 멤버를 함수로 선언하는 두 가지 방법
 * 1. 메서드 구문, member(): void
 * 2. 속성 구문, member: () => void
 *
 * => 매핑된 타입은 구분 X => 메서드를 원래 타입의 '속성'으로 취급함
 */
{
  interface Researcher {
    researchMethod(): void;
    researchProperty: () => string;
  }

  type JustProperties<T> = {
    [K in keyof T]: T[K];
  };

  type ResearcherProperties = JustProperties<Researcher>;

  // 다음과 같음:
  //   {
  //     researchMethod: () => void;
  //     researchProperty: () => string;
  //   }
}

/**
 * 📍 15.1.2 제한자 변경
 *
 * 원래 타입의 멤버에 대해 접근 제어 제한자인 `readonly`와 `?`도 변경 가능함
 */
{
  interface Environmentalist {
    area: string;
    name: string;
  }

  // 1️⃣ 모든 멤버 변수에 `readonly` 추가
  type ReadonlyEnvironmentalist = {
    readonly [K in keyof Environmentalist]: Environmentalist[K];
  };
  //   다음과 같음:
  //   {
  //     readonly area: string;
  //     readonly name: string;
  //   }

  // 2️⃣ 모든 멤버 변수에 `?`를 추가
  type OptionalReadonlyEnvironmentalist = {
    [K in keyof ReadonlyEnvironmentalist]?: ReadonlyEnvironmentalist[K];
  };
  //   다음과 같음:
  //   {
  //     readonly area?: string;
  //     readonly name?: string;
  //   }
}

{
  interface Conservationist {
    name: string;
    catchphrase?: string;
    readonly born: number;
    readonly died?: number;
  }

  // 1️⃣ 모든 멤버 변수에 `readonly` 제거
  type WritableConservationist = {
    -readonly [K in keyof Conservationist]: Conservationist[K];
  };
  //   다음과 같음:
  //   {
  //     name: string;
  //     catchphrase?: string;
  //     born: number;
  //     died?: number;
  //   }

  // 2️⃣ 모든 멤버 변수에 `?`를 제거
  type RequireWritableConservationist = {
    [K in keyof WritableConservationist]-?: WritableConservationist[K];
  };
  // 다음과 같음:
  //   {
  //     name: string;
  //     catchphrase: string;
  //     born: number;
  //     died: number;
  //   }
}

/**
 * 📍 15.1.3 제네릭 매핑된 타입
 *
 * 데이터가 애플리케이션을 통해 흐를 때 데이터가 어떻게 변형되는지 나타낼 때 유용
 * ex) 기존 타입의 값을 가져올 수 있지만 데이터 수정은 허용하지 않는 것이 좋음
 */
{
  type MakeReadonly<T> = {
    readonly [K in keyof T]: T[K]; // 모든 멤버에 readonly 제한자 추가
  };

  interface Species {
    genus: string;
    name: string;
  }

  type ReadonlySpecies = MakeReadonly<Species>;
  //   다음과 같음:
  //   {
  //     readonly genus: string;
  //     readonly name: string;
  //   }
}

{
  interface GenusData {
    family: string;
    name: string;
  }

  // GenusData 인터페이스를 얼마든지 제공하고 기본값이 채워진 객체를 다시 가져올 수 있음
  type MakeOptional<T> = {
    [K in keyof T]?: T[K];
  };
  // 다음과 같음:
  //   {
  //     family?: string;
  //     name?: string;
  //   }

  /**
   * GenusData의 기본값 위에 모든 {overrides}를 구조 분해 할당함
   */
  function createGenusData(overrides?: MakeOptional<GenusData>): GenusData {
    return {
      family: "unknown",
      name: "unknown",
      ...overrides,
    };
  }
}

// 타입 스크립트는 제네릭 매핑된 타입을 즉시 사용할 수 있는 유틸리티 타입을 제공함
// https://www.typescriptlang.org/docs/handbook/utility-types.html 참고 ✨✨
// ex) Partial<T>
