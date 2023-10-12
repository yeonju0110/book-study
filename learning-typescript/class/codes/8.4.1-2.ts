{
  interface AgeIsNumber {
    age: number;
  }

  interface AgeIsNotANumber {
    age: () => string;
  }

  //   class AsNumber implements AgeIsNumber, AgeIsNotANumber {
  //     age = 0; // ❌ Error
  //   }

  //   class NotAsNumber implements AgeIsNumber, AgeIsNotANumber {
  //     age() {
  //       // ❌ Error
  //       return "";
  //     }
  //   }
}
