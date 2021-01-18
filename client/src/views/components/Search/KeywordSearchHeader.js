import goBackImg from "../../../images/goBack.svg";

export default class KeywordSearchHeader {
  constructor({ $page }) {
    this.$page = $page;
    this.render();
  }

  render() {
    this.$header = document.createElement("header");
    this.$header.className = "Search__header";

    this.$goBack = document.createElement("button");
    this.$goBack.className = "Diary__goBack";
    this.$goBack.innerHTML = `<img src=${goBackImg} alt="goBack"/>`;

    this.$title = document.createElement("h1");
    this.$title.className = "Search__title";
    this.$title.textContent = "Keyword Search";

    this.$header.appendChild(this.$goBack);
    this.$header.appendChild(this.$title);
    this.$page.appendChild(this.$header);
  }
}
