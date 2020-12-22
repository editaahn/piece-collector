import headImg from "../../../images/daily_head_color.svg";
import store from "../../../state-management/index.js";
import { apiBaseUrl } from "../../../libraries/constants.js";
const axios = require("axios");

export default class DiaryColor {
  constructor({ $page, data: { id, color } }) {
    this.$page = $page;
    this.id = id;
    this.colors = store.state.colors;
    this.selectedColor = color || this.colors[0];
    this.colorId = this.selectedColor.id;

    this.render();

    this.$colorList.addEventListener("click", this.onClick.bind(this));
  }

  render() {
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

    this.selectColor(this.colorId);
    this.setBackgroundColor();

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$colorList);
    this.$page.appendChild(this.$wrapper);
  }

  selectColor(id) {
    this.$colorList.querySelectorAll("li").forEach(($color) => {
      $color.className =
        id === $color.dataset.colorid
          ? "Diary__color--selected"
          : "Diary__color";
    });
  }

  setBackgroundColor() {
    const hex = this.selectedColor.hex;
    this.$page.style.backgroundColor = `#${hex}E3`;
  }

  async edit(id, colorId) {
    await axios.put(`${apiBaseUrl}/daily/${id}`, colorId);
  }

  onClick(e) {
    if (e.target.className === "Diary__color") {
      const colorId = parseInt(e.target.dataset.colorid);
      this.selectedColor = this.colors.find((color) => color.id === colorId);
      this.id && this.edit(this.id, { colorId });

      this.selectColor(colorId);
      this.setBackgroundColor();
    }
  }
}
