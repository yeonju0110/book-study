{
  interface HasBothFunctionTypes {
    property: () => string; // 속성 구문
    method(): string; // 메서드 구문
  }

  const hasBoth: HasBothFunctionTypes = {
    property: () => "",
    method() {
      return "";
    },
  };

  hasBoth.property(); // ✅ Ok
  hasBoth.method(); // ✅ Ok
}
