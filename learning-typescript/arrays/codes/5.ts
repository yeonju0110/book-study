// 반환 타입: (string | number)[]
function firstCharAndSize(input: string) {
  return [input[0], input.length];
}

// firstChar 타입: string | number
// size 타입: string | number
const [firstChar, size] = firstCharAndSize("Gudit");
