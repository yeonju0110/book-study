{
  function announceSongBy(song: string, singer: string | undefined) {
    console.log(`Song: ${song}`);

    if (singer) {
      console.log(`Singer: ${singer}`);
    }
  }

  //   announceSongBy("Greensleeves"); // ❌ Error
  announceSongBy("Greensleeves", undefined); // ✅ Ok
  announceSongBy("Greensleeves", "Sia"); // ✅ Ok
}
