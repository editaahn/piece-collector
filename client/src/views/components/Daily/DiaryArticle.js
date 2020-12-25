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

    this.$text.addEventListener("keyup", this.resize.bind(this));
  }

  render() {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrapper";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt=${this.propertyName}>`;

    this.$text.innerHTML = this.text.replace(/\n/g, "<br>");

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$text);
    this.$page.appendChild(this.$wrapper);
  }

  onClick(e) {
    if (
      e.target.className === "Diary__article" ||
      e.target.className === "Diary__article--empty"
    ) {
      this.$text.className = "Diary__article--typing";
      this.$text.innerHTML = `
        <textarea placeholder="Write diary" rows="20" autofocus>${this.text}</textarea>
      `;
    }
  }

  resize() {
    // develop 필요
  }
}
