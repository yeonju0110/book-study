{
  interface WithNullableName {
    name: string | null;
  }

  interface WithNonNullableName extends WithNullableName {
    name: string; // ✅ Ok: 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만듦
  }

  //   interface WithNumericName extends WithNullableName {
  //     // ❌ Error
  //     name: number | string;
  //   }
}
