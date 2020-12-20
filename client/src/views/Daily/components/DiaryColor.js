import store from "../../../state-management/index.js";

export default class DiaryColor {
  constructor({ $page, data: { color } }) {
    this.$page = $page;
    this.selectedColor = color;
    this.colors = store.state.colors;

    this.render();
  }

  setBackgroundColor() {
    const hex = this.selectedColor.hex;
    this.$page.style.backgroundColor = '#' + hex;
  }

  render() {
    this.setBackgroundColor();
    this.$colorList = document.createElement("ul");
    this.$colorList.className = "colorList";
    this.$colorList.innerHTML = this.colors
      .map(
        (color) =>
          `<li class=${color.id === this.selectedColor.id ? "color selected" : "color"}>
              ${color.name}
              </li>
            `
      )
      .join("");

    this.$page.appendChild(this.$colorList);
  }
}
