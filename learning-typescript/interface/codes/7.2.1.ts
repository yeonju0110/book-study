{
  interface Book {
    author?: string;
    pages: number;
  }

  // ✅ Ok
  const ok: Book = {
    author: "Rita Dove",
    pages: 80,
  };

  // ✅ Ok
  const missing: Book = {
    pages: 80,
  };
}
