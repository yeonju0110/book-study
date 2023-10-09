{
  class Quote {
    readonly text: string;

    constructor(text: string) {
      this.text = "";
    }

    emphasize() {
      // this.text += "!"; // ❌ Error: annot assign to 'text' because it is a read-only property.
    }
  }

  const quote = new Quote(
    "There is a brilliant child locked inside every student."
  );

  // quote.text = "Ha!"; // ❌ Error: Cannot assign to 'text' because it is a read-only property
}
