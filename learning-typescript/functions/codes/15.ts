{
  let singer: (song: string) => string;

  singer = function (song) {
    return `Singing: ${song.toUpperCase()}!`; // ✅ Ok
  };
}
