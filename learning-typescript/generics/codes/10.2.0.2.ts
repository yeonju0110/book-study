{
  interface Array<T> {
    pop(): T | undefined;

    push(...items: T[]): number;
  }
}
