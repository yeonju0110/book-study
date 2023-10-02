{
  const singSongsRecursive = (songs: string[], count = 0): number =>
    songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
}
