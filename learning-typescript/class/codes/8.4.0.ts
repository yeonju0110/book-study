{
  interface Learner {
    name: string;
    study(hours: number): void;
  }

  class Student implements Learner {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    study(hours: number): void {
      for (let i = 0; i < hours; i += 1) {
        console.log("studying");
      }
    }
  }

  //   class Slacker implements Learner {
  //     // ❌
  //   }
}
