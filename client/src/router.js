import Monthly from "./views/pages/Monthly.js";
import Daily from "./views/pages/Daily.js";
import KeywordSearch from "./views/pages/KeywordSearch.js";
import { parsePath } from "./libraries/parsePath.js";

const $root = document.getElementById("root");
const $nav = document.getElementById("nav");

export const routes = {
  "/": new Monthly({ $root }),
  "/daily": new Daily({ $root }),
  "/search": new KeywordSearch({ $root }),
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
