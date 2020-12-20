export const parsePath = (pathName) => {
  const parsedPath = pathName.split("/")[1];
  return "/" + parsedPath;
};

export const getIdParameter = () => {
  const path = window.location.pathname;
  const paramIndexStart = path.lastIndexOf("/");
  return path.slice(paramIndexStart);
};
