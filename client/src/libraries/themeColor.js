// document의 themeColor 바꾸는 모듈

export const setDocumentTheme = (colorId = 2) => {
  document.documentElement.setAttribute("theme", colorId);
};
