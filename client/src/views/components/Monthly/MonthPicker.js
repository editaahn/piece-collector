import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class MonthPicker extends Component {
  constructor() {
    super({ store, keys: ["isMonthPickerOpen"] });
    this.$root = document.getElementById("root");
    this.$monthPicker = document.createElement("aside");
    this.$wrapper = document.createElement("article");
    this.$selectYear = document.createElement("select");
    this.$selectMonth = document.createElement("select");
    this.$done = document.createElement("button");

    this.$done.textContent = "done";

    this.$monthPicker.className = "MonthPicker";
    this.$wrapper.className = "MonthPicker__wrapper";
    this.$selectYear.className = "MonthPicker__select--year";
    this.$selectMonth.className = "MonthPicker__select--month";
    this.$done.className = "MonthPicker__done";

    this.$monthPicker.appendChild(this.$selectYear);
    this.$monthPicker.appendChild(this.$selectMonth);
    this.$monthPicker.appendChild(this.$done);

    this.$monthPicker.addEventListener("click", (e) => this.close(e));
    this.$monthPicker.addEventListener("change", (e) => this.change(e));
  }

  createOptions() {
    // store에 저장된 초기값 가져옴
    const initialDate = store.state.monthlyDate;
    const thisYear = new Date().getFullYear();
    this.selectedOption = {
      year: initialDate.year,
      month: initialDate.month,
    };
    const { year, month } = this.selectedOption;
    const minYear = 3; // 3년전 일기까지 쓸수있음

    this.$selectYear.innerHTML = Array(minYear + 1)
      .fill("")
      .map(
        (_, yearDifference) =>
          `<option ${thisYear - yearDifference === year ? "selected" : ""}> 
          ${thisYear - yearDifference}
        </option>`
      )
      .join("");

    this.$selectMonth.innerHTML = Array(12)
      .fill("")
      .map(
        (_, monthCount) =>
          `<option ${monthCount + 1 === month ? "selected" : ""}> 
            ${monthCount + 1}
          </option>`
      )
      .join("");
  }

  change(e) {
    const propertyName = e.target.className.replace(
      "MonthPicker__select--",
      ""
    );
    this.selectedOption[propertyName] = parseInt(e.target.value);
  }

  render() {
    if (store.state.isMonthPickerOpen) {
      this.createOptions();
      this.$root.appendChild(this.$monthPicker);
    } else {
      this.$monthPicker.remove();
    }
  }

  close(e) {
    const closeMonthPicker = () => store.dispatch("toggleMonthPicker", false);
    const className = e.target.className;

    if (store.state.isMonthPickerOpen && className === "MonthPicker") {
      closeMonthPicker();
    }
    if (className === "MonthPicker__done") {
      store.dispatch(
        "setMonthlyDate",
        new Date(this.selectedOption.year, this.selectedOption.month - 1)
      );
      closeMonthPicker();
    }
  }
}
