import headImg from "../../../images/daily_head_article.svg";
import DiaryTextModule from "./DiaryTextModule";

export default class DiaryArticle extends DiaryTextModule {
  constructor({ $page, data: { id, article } }) {
    super({
      $page,
      id,
      text: article,
      propertyName: "article",
      element: document.createElement("article"),
    });
  }

  render() {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrappingArticle";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt=${this.propertyName}>`;

    this.$text.innerHTML = this.text.replace('\n', '<br>');

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$text);
    this.$page.appendChild(this.$wrapper);
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
