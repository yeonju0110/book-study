/**
 * 10.7 Promise
 */

/**
 * 10.7.1 Promise 생성
 */
{
  class PromiseLike<Value> {
    constructor(
      executor: (
        resolve: (value: Value) => void,
        reject: (reason: unknown) => void
      ) => void
    ) {
      /* ... */
    }
  }
}

{
  // type: Promise<unknown>
  const resolvesUnknown = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
  });

  // type: Promise<string>
  const resolvesString = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
  });
}

{
  // type: Promise<string>
  const textEventually = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
  });

  //   type: Promise<number>
  const lengthEventually = textEventually.then((text) => text.length);
}

/**
 * 10.7.2 async 함수
 */
{
  // type: (text: string) => Promise<number>
  async function lengthAfterSecond(text: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return text.length;
  }

  //   type: (text: string) => Promise<number>
  async function lengthImmediately(text: string) {
    return text.length;
  }
}

{
  async function givesPromiseForString(): Promise<string> {
    return "Done!";
  }

  //   async function givesString(): string {
  //     // ❌ Promise<string>임
  //     return "Done!";
  //   }
}
