import menuOpenerImg from "../../../images/monthly_menuHamburger.svg";
import CalendarTitle from "./CalendarTitle.js";
import store from "../../../state-management/index.js";

export default class MonthlyHeader {
  constructor({ $nav }) {
    this.$nav = $nav;

    this.render();
    this.$menuOpener.addEventListener("click", this.openMenu.bind(this));
  }

  render() {
    this.$menuOpener = document.createElement("button");
    this.$menuOpener.className = "Monthly__menuOpener";
    this.$menuOpener.innerHTML = `<img src=${menuOpenerImg} alt="menu button for opening menu"/>`;

    this.$nav.appendChild(this.$menuOpener);

    this.calendarTitle = new CalendarTitle({
      $nav: this.$nav,
    });
  }

  openMenu() {
    store.dispatch("openMenu", true);
  }
}
