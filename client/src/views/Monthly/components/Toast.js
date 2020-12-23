import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class Toast extends Component {
  constructor() {
    super({ store, keys: ["isToastOpen"] });
    this.$root = document.getElementById("root");
    this.$toast = document.createElement("aside");
    this.$wrapper = document.createElement("article");
    this.$selectYear = document.createElement("select");
    this.$selectMonth = document.createElement("select");
    this.$done = document.createElement("button");

    this.$done.textContent = "done";

    this.$toast.className = "MonthPicker";
    this.$wrapper.className = "MonthPicker__wrapper";
    this.$selectYear.className = "MonthPicker__select--year";
    this.$selectMonth.className = "MonthPicker__select--month";
    this.$done.className = "MonthPicker__done";

    this.$toast.appendChild(this.$selectYear);
    this.$toast.appendChild(this.$selectMonth);
    this.$toast.appendChild(this.$done);

    this.$toast.addEventListener("click", (e) => this.close(e));
    this.$toast.addEventListener("change", (e) => this.change(e));
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
    if (store.state.isToastOpen) {
      this.createOptions();
      this.$root.appendChild(this.$toast);
    } else {
      this.$toast.remove();
    }
  }

  close(e) {
    const closeToast = () => store.dispatch("toggleToast", false);
    const className = e.target.className;

    if (store.state.isToastOpen && className === "MonthPicker") {
      closeToast();
    }
    if (className === "MonthPicker__done") {
      store.dispatch(
        "setMonthlyDate",
        new Date(this.selectedOption.year, this.selectedOption.month - 1)
      );
      closeToast();
    }
  }
}
