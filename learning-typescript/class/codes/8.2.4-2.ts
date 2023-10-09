class RandomQuote {
  readonly explicit: string = "Home is the nicest word there is.";
  readonly implicit = "Home is the nicest word there is.";

  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "We start learning the minute we're born."; // ✅ Ok

      //   this.implicit = "We start learning the minute we're born."; // ❌ Error
    }
  }
}

const quote = new RandomQuote();

quote.explicit; // 타입: string
quote.implicit; // 타입: "Home is the nicest word there is."
