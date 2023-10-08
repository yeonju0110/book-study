{
  interface HistoricalNovels {
    Oroonoko: number;
    [i: string]: number;
  }

  // ✅ Ok
  const novels: HistoricalNovels = {
    Outlander: 1991,
    Oroonoko: 1688,
  };

  //   const missingOroonoko: HistoricalNovels = {
  //     // ❌ Error: Property 'Oroonoko' is missing in type
  //     // '{ Outlander: number; }' but required in type 'HistoricalNovels'
  //     Outlander: 1991,
  //   };
}
