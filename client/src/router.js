import Monthly from "./views/Monthly/page/Monthly.js";
import Daily from "./views/Daily/page/Daily.js";
// import Search from "./views/pages/Search.js";
import { parsePath } from "./libraries/parsePath.js";

const $root = document.getElementById("root");
const $nav = document.getElementById("nav");

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
