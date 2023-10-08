{
  interface ChapterStarts {
    preface: 0;
    [i: string]: number;
  }

  const correctPreface: ChapterStarts = {
    preface: 0,
    night: 1,
    shopping: 5,
  };

  const correctPreface2: ChapterStarts = {
    preface: 0,
  };

  //   const wrongPreface: ChapterStarts = {
  //     // ❌ Error: Type '1' is not assignable to type '0'
  //     preface: 1,
  //   };
}
