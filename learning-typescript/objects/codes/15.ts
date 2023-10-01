{
  type ShortPoem = { author: string } & (
    | { kigo: string; type: "haiku" }
    | { meter: number; type: "villanelle" }
  );

  // ✅ Ok
  const morningGlory: ShortPoem = {
    author: "Fukuda Chiyo-ni",
    kigo: "Morning Glory",
    type: "haiku",
  };

  // ❌ error
  //   const oneArt: ShortPoem = {
  //     author: "Elizabeth Bishop",
  //     type: "villanelle",
  //   };

  // ❌ error
  //   const twoArt: ShortPoem = {
  //     author: "Elizabeth Bishop",
  //     kigo: "dd",
  //     type: "villanelle",
  //   };

  // ✅ Ok
  const threeArt: ShortPoem = {
    author: "Elizabeth Bishop",
    meter: 20,
    type: "villanelle",
  };
}
