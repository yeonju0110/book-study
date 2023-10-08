{
  interface Page {
    readonly text: string;
  }

  function read(page: Page) {
    console.log(page.text);
  }

  //   case 1
  const pageIsh = {
    text: "Hello, world!",
  };

  pageIsh.text += "!";

  // ✅ Ok
  read(pageIsh);

  //   case 2
  const pageIsh2: Page = {
    text: "Hello, world!",
  };

  // ❌ Error
  //   pageIsh2.text += "!";

  read(pageIsh);
}
