{
  class FieldTrip {
    destination: string;

    constructor(destination: string) {
      this.destination = destination; // ✅ Ok
      console.log(`We're going to ${this.destination}!`);

      //   this.nonexistent = destination; // ❌ Error: 선언되어 있지 않은 속성
    }
  }

  const trip = new FieldTrip("planetarium");

  trip.destination; // ✅ Ok

  //   trip.nonexistent; // ❌ Error
}
