import closeImg from "../../../images/goBack.svg";

export default class SearchHeader {
  constructor({ $layer, addSongs, getSelected, clearSelected }) {
    this.$layer = $layer;
    this.addSongs = addSongs;
    this.getSelected = getSelected;
    this.clearSelected = clearSelected;

    this.render();
    this.$submit?.addEventListener("click", this.submit.bind(this));
    this.$close.addEventListener("click", this.close.bind(this));
  } 

  render() {
    this.$header = document.createElement("header");
    this.$header.className = "Search__header";

    this.$title = document.createElement("h1");
    this.$title.className = "Search__title";
    this.$title.textContent = "Search Songs";

    this.$close = document.createElement("button");
    this.$close.className = "Search__close";
    this.$close.innerHTML = `<img src=${closeImg} alt="close the layer"/>`;

    this.$submitDiv = document.createElement("div");
    this.$submitDiv.className = "Search__submitDiv";

    this.$submit = document.createElement("button");
    this.$submit.className = "Search__submit";
    this.$submit.innerHTML = "select";

    this.$submitDiv.appendChild(this.$submit);
    this.disableSubmit(true);

    this.$header.appendChild(this.$close);
    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$submitDiv);
    this.$layer.appendChild(this.$header);

  }

  submit() {
    const songs = this.getSelected();
    this.addSongs(songs);

    this.clearSelected();
    this.disableSubmit(true);
    this.close();
  }

  close() {
    this.$layer.remove();
  }

  disableSubmit(isDisabled) {
    this.$submit.disabled = isDisabled; 
  }

}