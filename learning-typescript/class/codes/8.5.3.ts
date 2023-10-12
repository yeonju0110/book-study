{
  class GradeCounter {
    countGrades(grades: string[], letter: string) {
      return grades.filter((grade) => grade === letter).length;
    }
  }

  class FailureCounter extends GradeCounter {
    // ✅ Ok - 메서드 반환 타입 동일, 첫 번째 매개변수 동일
    countGrades(grades: string[]) {
      return super.countGrades(grades, "F");
    }
  }

  class AnyFailureChecker extends GradeCounter {
    // ❌ Error - 잘못된 반환 타입 (boolean)
    // countGrades(grades: string[]) {
    //   return super.countGrades(grades, "F") !== 0;
    // }
  }
}
