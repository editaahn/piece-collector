import Calendar from "../components/Monthly/Calendar";
import Component from "../../state-management/Component.js";
import store from "../../state-management/index.js";
import MonthlyHeader from "../components/Monthly/MonthlyHeader";
import ErrorPage from "./ErrorPage";
import { api } from "../../libraries/request.js";
import { setDocumentTheme } from "../../libraries/themeColor.js";

export default class Monthly extends Component {
  constructor({ $root }) {
    super({
      store,
      keys: ["monthlyDate"],
    });
    this.$root = $root;
  }

  async render() {
    this.$root.innerHTML = "";

    const $nav = document.createElement("header");
    const $page = document.createElement("section");

    $nav.className = "Monthly__header";
    $page.className = "page Monthly";

    const { monthlyDate } = store.state;
    try {
      const diaries = await api.getMonthlyData(
        monthlyDate.year,
        monthlyDate.month + 1
      );

      this.MonthlyHeader = new MonthlyHeader({
        $nav,
      });

      this.Calendar = new Calendar({
        $page,
        data: {
          date: monthlyDate,
          diaries,
        },
      });
    } catch (error) {
      this.ErrorPage = new ErrorPage({
        $page,
        error: error.response,
      });
    } finally {
      this.$root.appendChild($nav);
      this.$root.appendChild($page);
    }

    setDocumentTheme();
  }
}
