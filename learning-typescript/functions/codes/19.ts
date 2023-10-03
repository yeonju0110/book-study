{
  function logSong(song: string | undefined): void {
    if (!song) {
      return; // ✅ Ok
    }

    console.log(`${song}`);

    // return true; // ❌ Error
  }
}
