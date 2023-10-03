{
  type NumberToString = (input: number) => string;

  function usesNumberToString(numberToString: NumberToString) {
    console.log(`The string is: ${numberToString(1234)}`);
  }

  usesNumberToString((input) => `${input}! Hooray!`); // ✅ Ok

  //   usesNumberToString((input) => input * 2); // ❌ Error
}
