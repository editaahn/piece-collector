import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class MonthPicker extends Component {
  constructor({ $page }) {
    super({ store, keys: ['monthlyDate'] });
    this.$page = $page;

    this.$monthPicker = document.createElement("div");
    this.$month = document.createElement("h1");
    
    this.render();
    this.onClickMonth();
  }
  render() {
    const { year, month } = store.state.monthlyDate;

    this.$month.textContent = `${year} / ${month}`;

    this.$monthPicker.appendChild(this.$month);
    this.$page.appendChild(this.$monthPicker);
  }
  onClickMonth() {
    this.$monthPicker.addEventListener("click", () => {
      store.dispatch("toggleToast", true);
    });
  }
  // 추가작업: 스와이핑하여 변경
}
