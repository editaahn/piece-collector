export default class DiaryArticle {
  constructor({ $page, data: { article } }) {
    this.$page = $page;
    this.article = article;

    this.render();
  }
  render() {
    this.$page.innerHTML += `<article>${this.article}</article>`;
  }
}
