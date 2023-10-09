{
  class WithMethod {
    myMethod() {}
  }

  new WithMethod().myMethod === new WithMethod().myMethod; // true
}
