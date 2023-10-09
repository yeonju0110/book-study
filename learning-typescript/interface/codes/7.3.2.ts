{
  interface GivesNumber {
    giveNumber(): number;
  }

  interface GivesString {
    giveString(): string;
  }

  interface GivesBothAndEither extends GivesNumber, GivesString {
    giveEither(): number | string;
  }

  function useGivesBoth(instance: GivesBothAndEither) {
    instance.giveEither();
    instance.giveNumber();
    instance.giveString();
  }
}
