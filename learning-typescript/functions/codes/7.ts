{
  function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
      console.log(`${song}, by ${singer}`);
    }
  }

  singAllTheSongs("Alicia Keys"); // ✅ Ok
  singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face"); // ✅ Ok
  // singAllTheSongs("Ella Fitzgerald", 2000); // ❌ Error
}
