{
  type Book = {
    author?: string;
    pages: number;
  };

  // ✅ ok
  const book1: Book = {
    author: "Rita Dove",
    pages: 80,
  };

  // ✅ ok
  const book2: Book = {
    pages: 80,
  };

  // ❌ error
  //   const book3: Book = {
  //     author: "Rita Dove",
  //   };
}
