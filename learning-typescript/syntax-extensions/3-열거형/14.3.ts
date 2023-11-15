/**
 * 🎁 14.3 열거형
 *
 * 🚨 자주 반복되는 리터럴 집합이 있고, 그 리터럴 집합을 공통 이름으로 설명할 수 있으며,
 *   열거형으로 전환했을 때 훨씬 더 읽기 쉽지 않은 경우라면 열거형을 사용해서는 안됨
 */

/**
 * 1️⃣ 객체 사용
 */
{
  // 📍 자바스크립트는 열거형 구문을 포함하지 않으므로 열거형을 배치해야 하는 곳에 일반적인 `객체`를 사용함
  const StatusCodes = {
    InternalServerError: 500,
    NotFound: 404,
    Ok: 200,
  } as const;

  StatusCodes.InternalServerError; // 500

  /**
   * 📍 타입스크립트에서 열거형 같은 객체를 사용할 때 까다로운 점:
   *     해당 객체의 값 중 하나여야 함을 나타내는 훌륭한 타입 시스템 방법이 없다는 것
   *     => 한 가지 일반적인 방법: `keyof`와 `typeof` 타입 제한자를 함께 사용해 하나의 값을 해킹하는 것
   *     => 단점: 상당한 양의 구문을 입력해야 함
   * */
  {
    type StatusCodeValue = (typeof StatusCodes)[keyof typeof StatusCodes];

    let statusCodeValue: StatusCodeValue;

    statusCodeValue = 200; // Ok
    // @ts-expect-error
    statusCodeValue = -1; // ❌
  }
}

/**
 * 2️⃣ enum 사용
 */
{
  enum StatusCode {
    InternalServerError = 500,
    NotFound = 404,
    Ok = 200,
  }

  StatusCode.InternalServerError; // 500

  let statusCode: StatusCode;

  statusCode = StatusCode.Ok; // Ok
  statusCode = 200; // Ok

  /**
  * 위의 코드는 아래와 같이 변환됨
  var StatusCode;
  (function (StatusCode) {
    StatusCode[(StatusCode["InternalServerError"] = 500)] = "InternalServerError";
    StatusCode[(StatusCode["NotFound"] = 404)] = "NotFound";
    StatusCode[(StatusCode["Ok"] = 200)] = "Ok";
  })(StatusCode || (StatusCode = {}));
     */

  // TODO 🚨 타입스크립트는 약간의 타입 안정성을 희생하여 편의상 숫자 열거형값에 임의의 숫자를 할당할 수 있습니다..? p.320
}

/**
 * 14.3.1 자동 숫잣값
 *
 * 열거형의 멤버는 명시적인 초깃값을 가질 필요가 없음
 * 값이 생략되면 타입스크립트는 첫 번째 값을 0으로 시작 + 각 후속 값을 1씩 증가시킴
 */
{
  enum VisualTheme {
    Dark, //0
    Light, // 1
    System, // 2
  }

  enum Direction {
    Top = 1,
    Right, // 2
    Bottom, // 3
    Left, // 4
  }
}

/**
 * 14.3.2 문자열값을 갖는 열거형
 *
 * 숫잣값처럼 자동으로 계산할 수 없음
 */
{
  enum LoadStyle {
    AsNeeded = "as-needed",
    Eager = "eager",
  }

  /**
  * 위의 코드는 아래와 같이 변환됨
  var LoadStyle;
  (function (LoadStyle) {
    LoadStyle["AsNeeded"] = "as-needed";
    LoadStyle["Eager"] = "eager";
  })(LoadStyle || (LoadStyle = {}));
  */

  enum Wat {
    FirstString = "first",
    SomeNumber = 9000,
    ImplicitNumber, // Ok: 9001로 자동 계산 O
    AnotherString = "another",
    // @ts-expect-error
    NotAllowed, // ❌ Error: 문자열값 뒤는 자동 계산 X
  }
}

/**
 * 14.3.3 const 열거형
 */
{
  const enum DisplayHint {
    Opaque = 0,
    Semitransparent,
    Transparent,
  }

  let displayHint = DisplayHint.Transparent;

  // 📍 위의 코드는 아래와 같이 변환됨:
  //   열거형 선언이 모두 누락 + 열거형의 값에 대한 주석을 사용함
  //   let displayHint = 2; /* DisplayHint.Transparent */

  // 🤔 열거형 객체 정의를 생성하는 것이 여전히 바람직한 프로젝트라면?
  //    => preserveConstEnums 컴파일러 옵션을 사용 -> 열거형 정의 자체가 존재하도록 만들어줌

  // 🧐 but,,,
  //   const enum은 Babel로 트랜스파일할 수 없고, TypeScript의 --isolatedModules가 활성화된 환경에서는 큰 의미가 없다는 점을 주의
}
