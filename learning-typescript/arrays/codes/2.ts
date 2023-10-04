{
  function logWarriors(greeting: string, ...names: string[]) {
    for (const name of names) {
      console.log(`${greeting}, ${name}!`);
    }
  }

  const warriors = ["Harriet", "Joan", "Khutulun"];

  logWarriors("Hello", ...warriors); // ✅ Ok

  const birthYears = [1844, 1840, 1583];

  //   logWarriors("Born in", ...birthYears); // ❌ Error
}
