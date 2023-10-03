{
  const songs = ["Juice", "Shake It Off", "What's Up"];

  function runOnSongs(getSongAt: (index: number) => string) {
    for (let i = 0; i < songs.length; i += 1) {
      console.log(getSongAt(i));
    }
  }

  function getSongAt(index: number) {
    return `${songs[index]}`;
  }

  runOnSongs(getSongAt); // ✅ Ok

  function logSong(song: string) {
    return `${song}`;
  }

  //   runOnSongs(logSong); // ❌ Error
}
