{
  function getSongRecordingDate(song: string): Date | undefined {
    switch (song) {
      case "Strange Fruit":
        return new Date("April 20, 1939"); // ✅ Ok
      case "Greensleeves":
      // return "unknown"; // ❌ Error
      default:
        return undefined; // ✅ Ok
    }
  }
}
