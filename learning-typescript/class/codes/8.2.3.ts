{
  class MissingInitializer {
    property?: string;
  }

  new MissingInitializer().property?.length; // ✅ Ok

  //   new MissingInitializer().property.length; // ❌ Error: Object is possibly 'undefined'
}
