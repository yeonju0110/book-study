{
  class TwoKeywords {
    private readonly name: string;

    constructor() {
      this.name = "Anne";
    }

    log() {
      console.log(this.name); // ✅ Ok
    }
  }

  const two = new TwoKeywords();

  //   two.name = "Phule"; // ❌ Error
}
