import goBack from "../../../images/goBack.svg";

export default class DiaryHeader {
  constructor({ $nav, data: { date } }) {
    this.$nav = $nav;
    this.date = date;

    this.render();
  }

  render() {
    this.$date = document.createElement("h1");
    this.$date.className = "Diary__date";
    this.$date.innerHTML = this.date;

    this.$goBack = document.createElement("button");
    this.$goBack.className = "Diary__goBack";
    this.$goBack.innerHTML = `<img src=${goBack} alt="goBack"/>`;

    this.$submit = document.createElement("button");
    this.$submit.className = "Diary__submit";
    this.$submit.innerHTML = "done";

    this.$nav.appendChild(this.$goBack);
    this.$nav.appendChild(this.$date);
    this.$nav.appendChild(this.$submit);
  }
}
