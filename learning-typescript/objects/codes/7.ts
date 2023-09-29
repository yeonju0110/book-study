{
  type Author = {
    firstName: string;
    lastName: string;
  };

  type Poem = {
    author: Author;
    name: string;
  };

  //   const poemMismatch: Poem = {
  //     author: {
  //       name: "Sylvia Plath", // ❌ error
  //     },
  //     name: "Tulips",
  //   };
}
