{
  interface Learner {
    name: string;
    study(hours: number): void;
  }

  //   class Student implements Learner {
  //     name; // ❌ Error: Member 'name' implicitly has an 'any' type.

  //     study(hours) {} // ❌ Error: Parameter 'hours' implicitly has an 'any' type
  //   }
}
