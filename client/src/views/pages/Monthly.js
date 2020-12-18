import Calendar from "../components/Calendar";
import Component from "../../state-management/Component.js";
import store from "../../state-management/index.js";
import { apiBaseUrl } from "../../libraries/constants.js";
// import SelectMonth from "../components/Calendar";
const axios = require("axios");

export default class Monthly extends Component {
  constructor({ $root }) {
    super({
      store,
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

      this.Calendar = new Calendar({
        $page,
        data: {
          date: store.state.selectedDate,
          diaries: this.diaries,
        },
      });

      this.$root.appendChild($page);
    });
  }
}
