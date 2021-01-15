import menuOpenerImg from "../../../images/monthly_menuHamburger.svg";
import MonthChanger from "./MonthChanger.js";
import store from "../../../state-management/index.js";

export default class MonthlyHeader {
  constructor({ $nav }) {
    this.$nav = $nav;

    this.isMenuOpen = false;

    this.render();
    this.$menuOpener.addEventListener("click", this.openMenu.bind(this));
  }

  render() {
    this.$menuOpener = document.createElement("button");
    this.$menuOpener.className = "Monthly__menuOpener";
    this.$menuOpener.innerHTML = `<img src=${menuOpenerImg} alt="menu button for opening menu"/>`;

    this.$nav.appendChild(this.$menuOpener);

    this.monthChanger = new MonthChanger({
      $nav: this.$nav,
    });
  }

  openMenu() {
    store.dispatch("openMenu", true);
  }
}
