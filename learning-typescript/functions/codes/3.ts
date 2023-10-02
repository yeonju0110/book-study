{
  function announceSong(song: string, singer?: string) {
    console.log(`Song: ${song}`);

    if (singer) {
      console.log(`Singer: ${singer}`);
    }
  }

  announceSong("Greensleeves"); // ✅ Ok
  announceSong("Greensleeves", undefined); // ✅ Ok
  announceSong("Greensleeves", "Sia"); // ✅ Ok
}
