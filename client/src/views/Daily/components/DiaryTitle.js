import DiaryTextModule from "./DiaryTextModule";

export default class DiaryTitle extends DiaryTextModule {
  constructor({ $page, data: { id, title } }) {
    super({
      $page,
      id,
      text: title,
      propertyName: "title",
      element: document.createElement("h2"),
    });
  }

  onClick(e) {
    if (e.target.className === "Diary__title") {
      this.$text.className = "Diary__title--typing";
      this.$text.innerHTML = `
        <input placeholder="Untitled" value="${this.text}" />
      `;
      this.$text.querySelector('input').focus();
    }
  }
}
