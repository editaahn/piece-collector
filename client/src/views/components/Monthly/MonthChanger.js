import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class MonthChanger extends Component {
  constructor({ $page }) {
    super({ store, keys: ["monthlyDate"] });
    this.$page = $page;

    this.$monthChanger = document.createElement("div");
    this.$monthChanger.className = "MonthChanger";

    this.$month = document.createElement("h1");
    this.$month.className = "MonthChanger__month";

    this.render();
    this.onClickMonth();
  }
  render() {
    const { year, month } = store.state.monthlyDate;

    this.$month.textContent = `${year} / ${month + 1}`;

    this.$monthChanger.appendChild(this.$month);
    this.$page.appendChild(this.$monthChanger);
  }
  onClickMonth() {
    this.$monthChanger.addEventListener("click", () => {
      store.dispatch("toggleMonthPicker", true);
    });
  }
  // 추가작업: 스와이핑하여 변경
}
