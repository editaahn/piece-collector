import Calendar from "../components/Calendar";
import Component from "../../../state-management/Component.js";
import store from "../../../state-management/index.js";
import { apiBaseUrl } from "../../../libraries/constants.js";
import MonthPicker from "../components/MonthPicker";
const axios = require("axios");

export default class Monthly extends Component {
  constructor({ $root }) {
    super({
      store,
      keys: ['selectedDate'],
    });
    this.$root = $root;
  }

  async getMonthlyData(year, month) {
    const result = await axios.get(
      `${apiBaseUrl}/monthly?year=${year}&month=${month}`
    );
    this.diaries = result.data;
  }

  render() {
    const { selectedDate } = store.state;

    this.getMonthlyData(selectedDate.year, selectedDate.month).then(() => {
      this.$root.innerHTML = "";
      const $page = document.createElement("section");
      $page.className = "Monthly";

      this.MonthPicker = new MonthPicker({
        $page,
      });

      this.Calendar = new Calendar({
        $page,
        data: {
          date: selectedDate,
          diaries: this.diaries,
        },
      });

      this.$root.appendChild($page);
    });
  }
}
