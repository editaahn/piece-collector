import { setDocumentTheme } from "../../../libraries/themeColor";
import headImg from "../../../images/daily_head_color.svg";
import store from "../../../state-management/index.js";
import { api } from "../../../libraries/request.js";

export default class DiaryColor {
  constructor({ $page, data: { id, color } }) {
    this.$page = $page;
    this.id = id;

    this.colors = store.state.colors;
    this.color = color || this.colors[1];

    this.render();

    this.$colorList.addEventListener("click", this.onClick.bind(this));
  }

  render() {
    const color = this.color;

    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrapper";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt="color">`;

    this.$colorList = document.createElement("ul");
    this.$colorList.className = "Diary__colorList";
    this.$colorList.innerHTML = this.colors
      .map(
        (color) =>
          `<li 
            data-colorid="${color.id}" 
            style="background-color: #${color.hex}">
              ${color.name}
          </li>`
      )
      .join("");

    this.setIndicator(color);

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$colorList);
    this.$page.appendChild(this.$wrapper);
  }

  setIndicator(color) {
    this.$colorList.querySelectorAll("li").forEach(($color) => {
      const elementColorId = parseInt($color.dataset.colorid);
      $color.className =
        color.id === elementColorId ? "Diary__color--selected" : "Diary__color";
    });
  }

  onClick(e) {
    if (e.target.className === "Diary__color") {
      const colorId = parseInt(e.target.dataset.colorid);
      const selectedColor = this.colors.find((color) => color.id === colorId);

      setDocumentTheme(selectedColor.id);
      this.setIndicator(selectedColor); // dom class 변경
      this.id && api.editColor(this.id, { colorId: selectedColor.id }); // DB 변경
    }
  }
}
