{
  function singTwo(first: string, second: string) {
    console.log(`${first} / ${second}`);
  }

  // ❌ error
  //   singTwo("Ball and Chain");

  // ✅ Ok
  singTwo("I Will Survive", "Higher Love");

  // ❌ error
  //   singTwo("Go Your Own Way", "The Chain", "Dreams");
}
