{
  type FunctionAlias = (input: string) => number;

  interface CallSignature {
    (input: string): number;
  }

  // 타입: (input: string) => number
  const typedFunctionAlias: FunctionAlias = (input) => input.length; // ✅ Ok

  // 타입: (input: string) => number
  const typedCallSignature: CallSignature = (input) => input.length; // ✅ Ok
}
