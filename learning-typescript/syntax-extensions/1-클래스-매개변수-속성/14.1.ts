/**
 * 🎁 14.1 클래스 매개변수 속성
 *
 * 🚨 클래스를 많이 사용하는 프로젝트나 클래스 이점을 갖는 프레임워크가 아니라면 클래스 매개변수 속성을 사용하지 않는 것이 좋음
 *
 * - 새로운 # 클래스 private 필드 구문과 함께 사용할 수 없음
 * - 클래스 생성을 매우 선호하는 프로젝트에서는 매개변수 속성을 사용하면 정말 좋음
 *   => 이유: 매개변수 속성 이름과 타입을 두 번 선언해야 하는 편의 문제를 해결해주기 때문
 */

{
  // 1. 자바스크립트 클래스에서는 생성자에서 매개변수를 받고 즉시 클래스 속성에 할당하는 것이 일반적
  class Engineer {
    readonly area: string;

    constructor(area: string) {
      this.area = area;
      console.log(`I work in the ${area} area.`);
    }
  }

  new Engineer("mechanical").area;

  // 2. 타입 스크립트는 `매개변수 속성`을 선언하기 위한 단축 구문 제공
  // 생성자의 매개변수 앞에 `readonly` or `public`, `protected`, `private` 제한자 중 하나를 배치하면 됨
  // `매개변수 속성`은 클래스 생성자의 맨 처음에 할당됨 (파생 클래스는 `super()`를 호출한 이후 할당됨)
  class Engineer2 {
    constructor(readonly area: string) {
      console.log(`I work in the ${area} area.`);
    }
  }

  new Engineer2("mechanical").area;
}

{
  /**
   * #1: area를 매개변수 속성으로 지정했을 경우
   */
  class NamedEngineer {
    // fullName: 일반 속성
    fullName: string;

    // name: 일반 매개변수, area: 매개변수 속성
    constructor(name: string, public area: string) {
      this.fullName = `${name}, ${area} engineer`;
    }
  }

  new NamedEngineer("juju", "seoul").fullName;
  new NamedEngineer("juju", "seoul").area;

  /**
   * #2: area를 매개변수 속성으로 지정하지 않았을 경우
   * 매개변수 속성이 없으면 `area`를 명시적으로 할당하기 위한 코드가 몇 줄 더 필요
   */
  class NamedEngineer2 {
    fullName: string;

    constructor(name: string, area: string) {
      this.fullName = `${name}, ${area} engineer`;
    }
  }

  new NamedEngineer2("juju", "seoul").fullName;
  // @ts-ignore
  new NamedEngineer2("juju", "seoul").area; // ❌ 없는 속성 !!

  /**
   * #3: area를 매개변수 속성으로 지정하지 않았을 경우
   */
  class NamedEngineer3 {
    fullName: string;
    area: string; // 추가 ✨

    constructor(name: string, area: string) {
      this.area = area; // 추가 ✨
      this.fullName = `${name}, ${area} engineer`;
    }
  }

  new NamedEngineer3("juju", "seoul").fullName;
  new NamedEngineer3("juju", "seoul").area;
}
