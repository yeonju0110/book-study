{
  interface FunctionWithCount {
    count: number;
    (): void;
  }

  let hasCallCount: FunctionWithCount;

  function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been callbed ${keepsTrackOfCalls.count} times!`);
  }

  keepsTrackOfCalls.count = 0;

  hasCallCount = keepsTrackOfCalls; // ✅ Ok

  function doesNotHaveCount() {
    console.log("No idea!");
  }

  // ❌ Error: Property 'count' is missing in type '() => void
  // but required in type 'FunctionWithCount'.
  //   hasCallCount = doesNotHaveCount;
}
