{
  type FirstAndLastNames = {
    first: string;
    last: string;
  };

  // ✅ ok
  const hasBoth: FirstAndLastNames = {
    first: "Sarojini",
    last: "Naidu",
  };

  // ❌ error
  //   const hasOnlyOne: FirstAndLastNames = {
  //     first: "Sappho",
  //   };
}
