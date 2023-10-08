{
  interface Novel {
    author: {
      name: string;
    };
    setting: Setting;
  }

  interface Setting {
    place: string;
    year: number;
  }

  let myNovel: Novel;

  myNovel = {
    author: {
      name: "Jane",
    },
    setting: {
      place: "England",
      year: 1812,
    },
  };

  //   myNovel = {
  //     author: {
  //       name: "Emily",
  //     },
  //     setting: {
  //       // ❌ Error: Property 'year' is missing in type
  //       // '{ place: string; }' but required in type 'Setting'
  //       place: "NewYork",
  //     },
  //   };
}
