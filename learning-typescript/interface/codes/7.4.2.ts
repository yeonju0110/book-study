{
  interface MergedMethods {
    different(input: string): string;
  }

  interface MergedMethods {
    different(input: number): string; // ✅ Ok
  }
}
