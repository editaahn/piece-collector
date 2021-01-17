import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class SideMenu extends Component {
  constructor() {
    super({ store, keys: ["isMenuOpen"] });

    this.$root = document.getElementById("root");

    this.$sideMenu = document.createElement("aside");
    this.$sideMenu.className = "modal SideMenu";

    this.$wrapper = document.createElement("article");
    this.$wrapper.className = "SideMenu__wrapper";

    this.$sideMenu.appendChild(this.$wrapper);
    this.$root.appendChild(this.$sideMenu);
    window.addEventListener("keyup", this.closeMenu);
  }

  render() {
    if (store.state.isMenuOpen) {
      this.$sideMenu.style.display = "block";
      setTimeout(() => this.$wrapper.style.left = "0", 0);
    } else {
      this.$wrapper.style.left = "-300px";
      setTimeout(() => this.$sideMenu.style.display = "none", 350);
    }
  }

  closeMenu(e) {
    if (e.key === "Esc" || e.key === "Escape") {
      store.dispatch("openMenu", false);
    }
  }
}
