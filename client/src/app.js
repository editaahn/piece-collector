import "./main.css";
import { onNavigate, initialRoutes, routes } from "./router.js";

class App {
  constructor() {
    this.routes = routes;
    initialRoutes();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});