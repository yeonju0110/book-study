{
  type Poem = {
    author: {
      firstName: string;
      lastName: string;
    };
    name: string;
  };

  const poemMatch: Poem = {
    author: {
      firstName: "Sylvia",
      lastName: "Plath",
    },
    name: "Lady Lazarus",
  };

  //   const poemMismatch: Poem = {
  //     author: {
  //       name: "Sylvia Plath", // ❌ error
  //     },
  //     name: "Tulips",
  //   };
}
