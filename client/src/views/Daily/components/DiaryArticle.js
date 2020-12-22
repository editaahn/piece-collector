import DiaryTextModule from "./DiaryTextModule";

export default class DiaryTitle extends DiaryTextModule {
  constructor({ $page, data: { id, article } }) {
    super({
      $page,
      id,
      text: article,
      propertyName: "article",
      element: document.createElement("article"),
    });
  }

  onClick(e) {
    if (e.target.className === "Diary__article") {
      this.$text.className = "Diary__article--typing";
      this.$text.innerHTML = `
        <textarea placeholder="Write diary" autofocus>${this.text}</textarea>
      `;
    }
  }
}
