{
  function logWrapper<Input>(callback: (input: Input) => void) {
    return (input: Input) => {
      console.log("Input:", input);
      callback(input);
    };
  }

  // type: (input: string) => void
  logWrapper((input: string) => {
    console.log(input.length);
  });

  // type: (input: unknown) => void
  logWrapper((input) => {
    // console.log(input.length); // ❌ Error: 'input' is of type 'unknown'
  });

  // 명시적 제너릭 타입 인수 사용 -> 기본값이 unknown으로 설정되는 것을 피할 수 있음
  // type: (input: string) => void
  logWrapper<string>((input) => {
    console.log(input.length); // ✅
  });

  // type: (input: string) => void
  logWrapper<string>((input: string) => {
    console.log(input.length); // ✅
  });
}
