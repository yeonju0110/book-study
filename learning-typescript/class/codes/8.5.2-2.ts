class GradesTally {
  grades: number[] = [];

  addGrades(...grades: number[]) {
    this.grades.push(...grades);
    return this.grades.length;
  }
}

class ContinuedGradesTally extends GradesTally {
  constructor(previousGrades: number[]) {
    // this.grades = [...previousGrades]; // ❌ Error

    super();

    console.log("Starting with length", this.grades.length); // ✅ Ok
  }
}
