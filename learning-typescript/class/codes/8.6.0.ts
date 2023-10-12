{
  abstract class School {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }

    abstract getStudentTypes(): string[];
  }

  class Preschool extends School {
    getStudentTypes() {
      return ["preschooler"];
    }
  }

  //   class Absence extends School {} // ❌ Error: getStudentTypes 구현 안함
}
