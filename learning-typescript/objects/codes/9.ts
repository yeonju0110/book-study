{
  type Writers = {
    author: string | undefined;
    editor?: string;
  };

  // ✅ ok
  const hasRequired: Writers = {
    author: undefined,
  };

  // ❌ error
  // const missingRequired: Writers = {};
}
