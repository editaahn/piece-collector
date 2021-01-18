import { onNavigate } from "../../../router.js";
import Component from "../../../state-management/Component";
import store from "../../../state-management/index.js";

export default class SideMenu extends Component {
  constructor() {
    super({ store, keys: ["isMenuOpen"] });
    const menuList = [{ name: "Keyword Search", location: "/search" }];

    this.$root = document.getElementById("root");

    this.$sideMenu = document.createElement("aside");
    this.$sideMenu.className = "modal SideMenu";

    this.$wrapper = document.createElement("article");
    this.$wrapper.className = "SideMenu__wrapper";

    this.$menuList = document.createElement("ul");
    this.$menuList.innerHTML = menuList.map(
      (menu) => `
      <li class="menu" data-location=${menu.location}>${menu.name}</li>
    `
    );

    this.$wrapper.appendChild(this.$menuList);
    this.$sideMenu.appendChild(this.$wrapper);
    this.$root.appendChild(this.$sideMenu);

    window.addEventListener("keyup", this.closeMenu);
    this.$menuList.addEventListener("click", this.clickMenu);
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

  clickMenu(e) {
    if (e.target.className === "menu") {
      const location = e.target.dataset.location;
      onNavigate(location);
    }
  }
}
