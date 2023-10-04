{
  // 반환 타입: [string, number]
  function firstCharAndSizeExplicit(input: string): [string, number] {
    return [input[0], input.length];
  }

  // firstChar 타입: string
  // size 타입: number
  const [firstChar, size] = firstCharAndSizeExplicit("Cathay");
}
