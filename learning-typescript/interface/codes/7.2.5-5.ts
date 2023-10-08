{
  interface MoreNarrowNumbers {
    [i: number]: string;
    [i: string]: string | undefined;
  }

  const mixesNumbersAndStrings: MoreNarrowNumbers = {
    0: "",
    key1: "",
    key2: undefined,
  };

  // ✅ Ok
  interface NumberIndexSignature {
    [i: number]: string | undefined;
  }

  // ✅ Ok
  interface NumberStringSignature {
    [i: number]: string | undefined;
    [i: string]: string | undefined;
  }

  interface MoreNarrowStrings {
    // [i: number]: string | undefined; // ❌ Error
    // 'number' index type 'string | undefined'
    //   is not assignable to 'string' index type 'string'
    [i: string]: string;
  }
}
