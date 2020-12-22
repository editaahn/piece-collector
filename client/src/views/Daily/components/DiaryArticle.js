import { apiBaseUrl } from "../../../libraries/constants.js";
const axios = require("axios");

export default class DiaryArticle {
  constructor({ $page, data: { id, article } }) {
    this.$page = $page;
    this.id = id;
    this.article = article;

    this.$article = document.createElement("article");
    this.$article.className = "Diary__article";
    this.render();
    this.$article.addEventListener("click", this.onClickArticle.bind(this));
    this.$article.addEventListener("focusout", this.onBlur.bind(this));
  }

  render() {
    this.$article.innerHTML = this.article;
    this.$page.appendChild(this.$article);
  }

  onClickArticle(e) {
    if (e.target.className === "Diary__article") {
      this.$article.className = "Diary__article--typing";
      this.$article.innerHTML = `
          <textarea placeholder="Write diary">${this.article}</textarea>
      `;
    }
  }

  async edit(id, article) {
    const result = await axios.put(`${apiBaseUrl}/daily/${id}`, article);
    this.article = result.data.article;
  }

  async onBlur(e) {
    if (this.id) {
      // 포커스 풀면 저장하고 render.
      const article = e.target.value;
      await this.edit(this.id, { article });
      this.$article.className = "Diary__article";
      this.$article.innerHTML = this.article;
    }
  }
}
