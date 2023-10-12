{
  interface Graded {
    grades: number[];
  }

  interface Reporter {
    report: () => string;
  }

  class ReportCard implements Graded, ReportCard {
    grades: number[];

    constructor(grades: number[]) {
      this.grades = grades;
    }

    report() {
      return this.grades.join(", ");
    }
  }

  // class Empty implements Graded, Reporter {} // ❌ Error
}
