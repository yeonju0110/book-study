{
  interface Page {
    readonly text: string;
  }

  function read(page: Page) {
    // ✅ Ok: text 속성을 수정하지 않고 읽는 것
    console.log(page.text);

    // ❌ Error: 수정 불가
    //   page.text += "!";
  }
}
