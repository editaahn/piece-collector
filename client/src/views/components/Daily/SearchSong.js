export default class SearchSong {
  constructor() {
    this.$root = document.getElementById("root");
    this.render();
    this.$input.addEventListener("keyup", this.search)
  }

  render() {
    this.$layer = document.createElement("aside");
    this.$layer.className = "popup SearchSong";

    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "Search__inputWrapper";

    this.$input = document.createElement("input");
    this.$input.className = "Search__input";
    this.$input.placeholder = "Type Keyword & Press Enter";

    this.$wrapper.appendChild(this.$input);
    this.$layer.appendChild(this.$wrapper);
    this.$root.appendChild(this.$layer);
  }

  search(e) {
    console.log(e.target.value)
  }
}
