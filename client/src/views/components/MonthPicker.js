export default class MonthPicker {
  constructor({ $page, data, setMonth }) {
    this.$page = $page;
    this.date = data.date;
    this.setMonth = setMonth;

    this.render();
  }
  render() {
    const { year, month } = this.date;
    const $header = document.createElement("div");
    const $month = document.createElement("h1");

    $month.textContent = `${year} / ${month}`;

    $header.appendChild($month);
    this.$page.appendChild($header);
  }
  onClickMonth() {
    
  }
}
