{
  class NumericGrade {
    value = 0;
  }

  class VagueGrade extends NumericGrade {
    // value = Math.random() > 0.5 ? 1 : "..."; // ❌ Error
    //   number type에 | string을 추가하려고 해서 오류 발생
  }
}
