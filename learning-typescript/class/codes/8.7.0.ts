{
  class Base {
    isPublicImplicit = 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
  }

  class Subclass extends Base {
    examples() {
      this.isPublicImplicit; // ✅ Ok
      this.isPublicExplicit; // ✅ Ok
      this.isProtected; // ✅ Ok

      //   this.isPrivate; // ❌ Error
      //   this.#truePrivate; // ❌ Error
    }
  }

  new Subclass().isPublicImplicit; // ✅ Ok
  new Subclass().isPublicExplicit; // ✅ Ok

  //   new Subclass().isProtected; // ❌ Error
  //   new Subclass().isPrivate; // ❌ Error
}
