{
  function format(data: string): string; // ✅ Ok
  function format(data: string, needle: string, haystack: string): string; // ✅ Ok

  // function format(getData: () => string): string; // ❌ Error

  function format(data: string, needle?: string, haystack?: string) {
    return needle && haystack ? data.replace(needle, haystack) : data;
  }
}
