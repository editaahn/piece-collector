import Calendar from "../components/Monthly/Calendar";
import Component from "../../state-management/Component.js";
import store from "../../state-management/index.js";
import { apiBaseUrl } from "../../libraries/constants.js";
import MonthPicker from "../components/Monthly/MonthPicker";
const axios = require("axios");

export default class Monthly extends Component {
  constructor({ $root }) {
    super({
      store,
      keys: ['monthlyDate'],
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
    const { monthlyDate } = store.state;

    this.getMonthlyData(monthlyDate.year, monthlyDate.month).then(() => {
      this.$root.innerHTML = "";
      const $page = document.createElement("section");
      $page.className = "page Monthly";

      this.MonthPicker = new MonthPicker({
        $page,
      });

      this.Calendar = new Calendar({
        $page,
        data: {
          date: monthlyDate,
          diaries: this.diaries,
        },
      });

      this.$root.appendChild($page);
    });
  }
}
