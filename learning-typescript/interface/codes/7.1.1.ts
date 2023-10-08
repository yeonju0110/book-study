{
  interface Poet {
    born: number;
    name: string;
  }

  let valueLater: Poet;

  // Ok
  valueLater = {
    born: 1935,
    name: "Sara Teasdale",
  };

  //   valueLater = {
  //     // Error: Type 'boolean' is not assignable to type 'number'
  //     born: true,
  //     name: "Sappho",
  //   };
}
