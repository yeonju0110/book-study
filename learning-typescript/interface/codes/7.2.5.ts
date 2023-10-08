{
  interface WordCounts {
    [i: string]: number;
  }

  const counts: WordCounts = {};

  counts.apple = 0; // ✅ Ok
  counts.banana = 1; // ✅ Ok

  // ❌ Error: Type 'boolean' is not assignable to type 'number'
  //   counts.cherry = false;
}
