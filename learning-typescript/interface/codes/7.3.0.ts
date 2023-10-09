{
  interface Writing {
    title: string;
  }

  interface Novella extends Writing {
    pages: number;
  }

  // ✅ Ok
  let myNovella: Novella = {
    pages: 195,
    title: "Ethan",
  };

  //   let missingPages: Novella = {
  //     // ❌ Error: Property 'pages' is missing in type
  //     // '{ title: string; }' but required in type 'Novella'
  //     title: "The Awakening",
  //   };

  //   let extraProperty: Novella = {
  //     pages: 300,
  //     strategy: "baseline", // ❌ Error
  //     //   Type '{ pages: number; strategy: string; style: string; }' is not assignable to type 'Novella'.
  //     //   Object literal may only specify known properties, and 'strategy' does not exist in type 'Novella'
  //     style: "Naturalism",
  //   };
}
