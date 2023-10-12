{
  class Question {
    protected static readonly answer: "bash";
    protected static readonly prompt =
      "What's an ogre's favorite programming language?";

    guess(getAnswer: (promt: string) => string) {
      const answer = getAnswer(Question.prompt);

      if (answer === Question.answer) {
        console.log("You got it!");
      } else {
        console.log("Try again...");
      }
    }
  }

  //   Question.answer; // ❌ Error
}
