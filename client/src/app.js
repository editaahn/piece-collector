import "./main.css";
import Toast from "./views/components/Toast";
import { onNavigate, initialRoutes, routes } from "./router.js";

class App {
  constructor() {
    this.routes = routes;
    initialRoutes();
    this.toast = new Toast();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});