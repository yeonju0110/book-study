{
  interface DatesByName {
    [i: string]: Date;
  }

  const publishDates: DatesByName = {
    Frankestein: new Date("1 January 1818"),
  };

  publishDates.Frankestein; // 타입: Date
  console.log(publishDates.Frankestein.toString()); // ✅ Ok

  publishDates.Beloved; // 타입은 Date이지만 런타임 값은 undefined
  console.log(publishDates.Beloved.toString());
  // 타입 시스템에서는 오류가 나지 않지만 실제 런타임에서는 오류가 발생함
  // ❌ Runtime Error: Cannot read properties of undefined (reading 'toString')
}
