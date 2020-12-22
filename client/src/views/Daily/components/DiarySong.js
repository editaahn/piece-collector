import headImg from "../../../images/daily_head_song.svg";

export default class DiarySong {
  constructor({ $page, data: { songs } }) {
    this.$page = $page;
    this.songs = songs;

    this.render();
  }
  render() {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrappingSong";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt="song">`;

    this.$songList = document.createElement("ul");
    this.$songList.className = "Diary__songList";
    this.$songList.innerHTML += this.songs
      .map(
        (song) => `<li class="Diary__song">${song.artist} - ${song.title}</li>`
      )
      .join("");

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$songList);
    this.$page.appendChild(this.$wrapper);
  }
}
