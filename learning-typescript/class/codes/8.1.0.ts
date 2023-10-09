{
  class Greeter {
    greet(name: string) {
      console.log(`${name}, do your stuff!`);
    }
  }

  new Greeter().greet("Miss Frizzle"); // ✅ Ok

  //   new Greeter().greet(); // ❌ Error: Expected 1 arguments, but got 0.
}
