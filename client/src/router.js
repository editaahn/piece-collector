import Monthly from "./views/pages/Monthly.js";
import Daily from "./views/pages/Daily.js";
// import Search from "./views/pages/Search.js";

const $root = document.getElementById("root");

export const routes = {
  "/": new Monthly({ $root }),
  "/daily": new Daily({ $root }),
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  routes[pathname].render();
};

export const initialRoutes = () => {
  routes[window.location.pathname].render();
  window.onpopstate = () => routes[window.location.pathname].render();
};
