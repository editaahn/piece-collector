import store from "./state-management/index.js";
import "./main.css";
import MonthPicker from "./views/components/Monthly/MonthPicker.js";
import SideMenu from "./views/components/SideMenu/SideMenu.js";
import { onNavigate, initialRoutes, routes } from "./router.js";
import { parsePath } from "./libraries/parsePath";

class App {
  constructor() {
    this.routes = routes;
    initialRoutes();
    this.monthPicker = new MonthPicker();
    this.sideMenu = new SideMenu();
    store.dispatch("getColors");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

window.onpopstate = () => {
  const parsedPath = parsePath(window.location.pathname);
  return routes[parsedPath].render();
};