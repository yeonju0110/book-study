{
  class Teacher {
    sayHello() {
      console.log("Take chances, make mistakes, get messy!");
    }
  }

  let teacher: Teacher;

  teacher = new Teacher(); // ✅ Ok

  // teacher = "Wahoo!"; // ❌ Error: Type 'string' is not assignable to type 'Teacher'
}
