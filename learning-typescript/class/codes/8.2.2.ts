{
  class WithValue {
    immediate = 0; // ✅ Ok
    later: number; // ✅ Ok (constructor에서 할당)
    mayBeUndefined: number | undefined; // ✅ Ok (undefined가 되는 것이 허용됨)
    //   unused: number; // ❌ Error: has no initializer

    constructor() {
      this.later = 1;
    }
  }
}
