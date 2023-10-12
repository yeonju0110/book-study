{
  class Assignment {
    grade?: number;
  }

  class GradedAssignment extends Assignment {
    grade: number; // ✅ Ok

    constructor(grade: number) {
      super();
      this.grade = grade;
    }
  }
}
