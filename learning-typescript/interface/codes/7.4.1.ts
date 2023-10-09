{
  interface MergedProperties {
    same: (input: boolean) => string;
    different: (input: string) => string;
  }

  interface MergedProperties {
    same: (input: boolean) => string; // ✅ Ok
    //   different: (input: number) => string; // ❌ Error
  }
}
