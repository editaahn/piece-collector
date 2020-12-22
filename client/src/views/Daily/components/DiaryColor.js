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

  setBackgroundColor() {
    const hex = this.selectedColor.hex;
    this.$page.style.backgroundColor = "#" + hex;
  }

  render() {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrappingColor";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt="color">`;

    this.setBackgroundColor();

    this.$colorList = document.createElement("ul");
    this.$colorList.className = "Diary__colorList";
    this.$colorList.innerHTML = this.colors
      .map(
        (color) =>
          `<li class="${
            color.id === this.selectedColor.id
              ? "Diary__color--selected"
              : "Diary__color"
          }" data-colorid="${color.id}">
              ${color.name}
              </li>
            `
      )
      .join("");

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$colorList);
    this.$page.appendChild(this.$wrapper);
  }

  async edit(id, colorId) {
    await axios.put(`${apiBaseUrl}/daily/${id}`, colorId);
  }

  onClick(e) {
    const colorId = parseInt(e.target.dataset.colorid);
    this.selectedColor = this.colors.find((color) => color.id === colorId);
    this.id && this.edit(this.id, { colorId });
    this.setBackgroundColor();
  }
}
