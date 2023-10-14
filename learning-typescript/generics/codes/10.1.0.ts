{
  function identity<T>(input: T) {
    return input;
  }

  const arrowIdentity = <T>(input: T) => input;

  const numeric = identity("me"); // type: "me"
  const stringy = arrowIdentity(123); // type: 123
}
