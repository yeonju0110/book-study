{
  function returnsVoid() {
    return;
  }

  let lazyValue: string | undefined;

  //   lazyValue = returnsVoid(); // ❌ Error
}
