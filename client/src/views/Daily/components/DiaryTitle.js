export default class DiaryTitle {
  constructor({ $page, data: { title } }) {
    this.$page = $page;
    this.title = title;

    this.render();
  }
  render() {
    this.$page.innerHTML += `<h1>${this.title}</h1>`;
  }
}
