import { apiBaseUrl } from "../../libraries/constants.js";
import Calendar from "../components/Calendar";
// import SelectMonth from "../components/Calendar";
const axios = require("axios");

export default class Monthly {
  constructor({ $root }) {
    this.$root = $root;

    const today = new Date();
    this.setDateState({ date: today });
  }

  setDateState(nextData) {
    const { date } = nextData;
    this.date = {
      date: date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  }

  async getMonthlyData() {
    // 추후 redux thunk를 통해 state로 관리
    const result = await axios.get(
      `${apiBaseUrl}/monthly?year=${this.date.year}&month=${this.date.month}`
    );
    this.diaries = result.data;
  }

  render() {
    this.getMonthlyData().then(() => {
      this.$root.innerHTML = '';
      const $page = document.createElement("section");
      $page.className = "Monthly"
      
      this.Calendar = new Calendar({
        $page,
        data: {
          date: this.date,
          diaries: this.diaries,
        },
      });

      this.$root.appendChild($page)
    });
  }
}
