import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class CalendarTitle extends Component {
  constructor({ $nav }) {
    super({ store, keys: ["monthlyDate"] });
    this.$nav = $nav;

    this.$calendarTitle = document.createElement("div");
    this.$calendarTitle.className = "CalendarTitle";

    this.$month = document.createElement("h1");
    this.$month.className = "CalendarTitle__month";

    this.render();
    this.onClickMonth();
  }
  render() {
    const { year, month } = store.state.monthlyDate;

    this.$month.textContent = `${year} / ${month + 1}`;

    this.$calendarTitle.appendChild(this.$month);
    this.$nav.appendChild(this.$calendarTitle);
  }
  onClickMonth() {
    this.$calendarTitle.addEventListener("click", () => {
      store.dispatch("toggleMonthPicker", true);
    });
  }
  // 추가작업: 스와이핑하여 변경
}
