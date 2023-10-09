{
  class WithPropertyParameters {
    takesParameters = (input: boolean) => (input ? "Yes" : "No");
  }

  const instance = new WithPropertyParameters();

  instance.takesParameters(true); //✅ Ok

  //   instance.takesParameters(123); // ❌ Error
  // Argument of type 'number' is not assignable to parameter of type 'boolean'.
}
