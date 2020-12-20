import Monthly from "./views/pages/Monthly.js";
import Daily from "./views/pages/Daily.js";
// import Search from "./views/pages/Search.js";
import { parsePath } from "./libraries/parsePath.js";

const $root = document.getElementById("root");

export const routes = {
  "/": new Monthly({ $root }),
  "/daily": new Daily({ $root }),
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  const parsedPath = parsePath(pathname);
  routes[parsedPath].render();
};

export const initialRoutes = () => {
  const pathName = window.location.pathname
  routes[pathName].render();
};
