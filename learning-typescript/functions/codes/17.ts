{
  type StringToNumber = (input: string) => number;

  let stringToNumber: StringToNumber;

  stringToNumber = (input) => input.length; // ✅ Ok

  //   stringToNumber = (input) => input.toUpperCase(); // ❌ Error
}
