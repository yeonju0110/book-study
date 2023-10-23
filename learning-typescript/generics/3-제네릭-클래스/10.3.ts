/**
 * 10.3 제네릭 클래스
 */
{
  class Secret<Key, Value> {
    key: Key;
    value: Value;

    constructor(key: Key, value: Value) {
      this.key = key;
      this.value = value;
    }

    getValue(key: Key): Value | undefined {
      return this.key === key ? this.value : undefined;
    }
  }

  const storage = new Secret(12345, "luggage"); // type: Secret<number, string>

  storage.getValue(1987); // type: string | undefined
}

/**
 * 10.3.1 명시적 제네릭 클래스 타입
 */
{
  class CurriedCallback<Input> {
    #callback: (input: Input) => void;

    constructor(callback: (input: Input) => void) {
      this.#callback = (input: Input) => {
        console.log("Input:", input);
        callback(input);
      };
    }

    call(input: Input) {
      this.#callback(input);
    }
  }

  new CurriedCallback((input: string) => {
    console.log(input.length);
  });

  // new CurriedCallback((input) => {
  //   console.log(input.length); // ❌ 유추 불가
  // });

  new CurriedCallback<string>((input) => {
    // ✅ 유추 가능
    console.log(input.length);
  });
}

/**
 * 10.3.2 제네릭 클래스 확장
 */
{
  class Quote<T> {
    lines: T;

    constructor(lines: T) {
      this.lines = lines;
    }
  }

  class SpokenQuote extends Quote<string[]> {
    speak() {
      console.log(this.lines.join("\n"));
    }
  }

  new Quote("The only real failure is the failure to try.").lines; // type: sting
  new Quote([4, 8, 15, 16, 23, 42]).lines; // type: number[]

  new SpokenQuote(["Greed is so destructive.", "It destroys everything"]).lines;

  // new SpokenQuote([4, 8, 15, 16, 23, 42]); // ❌ string 타입이 아님

  class AttributedQuote<Value> extends Quote<Value> {
    speaker: string;

    constructor(value: Value, speaker: string) {
      super(value);
      this.speaker = speaker;
    }
  }

  // type: AttributedQuote<string>
  new AttributedQuote(
    "The road to success is always under construction.",
    "Lily Tomlin"
  );
}

/**
 * 10.3.3 제네릭 인터페이스 구현
 */
{
  interface ActingCredit<Role> {
    role: Role;
  }

  class MoviePart implements ActingCredit<string> {
    role: string;
    speaking: boolean;

    constructor(role: string, speaking: boolean) {
      this.role = role;
      this.speaking = speaking;
    }
  }

  const part = new MoviePart("Miranda Priestly", true);

  part.role; // type: string

  // class IncorrectExtension implements ActingCredit<string> {
  //   role: boolean; // ❌ string이어야 함
  // }
}

/**
 * 10.3.4 메서드 제네릭
 */
{
  class CreatePairFactory<Key> {
    key: Key;

    constructor(key: Key) {
      this.key = key;
    }

    createPair<Value>(value: Value) {
      return { key: this.key, value };
    }
  }

  // type: CreatePairFactory<string>
  const factory = new CreatePairFactory("role");

  // type: { key: string, value: number }
  const numberPair = factory.createPair(10);

  // type: { key: string, value: string }
  const stringPair = factory.createPair("Sophie");
}

/**
 * 10.3.5  정적 클래스 제네릭
 */
{
  class BothLogger<OnInstance> {
    instanceLog(value: OnInstance) {
      console.log(value);
      return value;
    }

    static staticLog<OnStatic>(value: OnStatic) {
      // let fromInstance: OnInstance; // ❌ static 메서드는 onInstance 인스턴스에 접근할 수 없음
      console.log(value);
      return value;
    }
  }

  const logger = new BothLogger<number[]>();
  logger.instanceLog([1, 2, 3]); // type: number[]

  BothLogger.staticLog([false, true]); // type: boolean[] 으로 유추

  BothLogger.staticLog<string>("You can't change the music of your soul."); // type: string으로 유추
}
