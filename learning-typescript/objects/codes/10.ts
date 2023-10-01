{
  const poem =
    Math.random() > 0.5
      ? { name: "The Double Image", pages: 7 }
      : { name: "Her Kind", rhymes: true };

  poem.name; // string
  poem.pages; // number | undefined
  poem.rhymes; // booleans | undefined
}
