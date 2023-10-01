{
  type ShortPoemBase = { author: string };
  type Haiku = ShortPoemBase & { kigo: string; type: "haiku" };
  type Villanelle = ShortPoemBase & { meter: number; type: "villanelle" };
  type ShortPoem = Haiku | Villanelle;
}
