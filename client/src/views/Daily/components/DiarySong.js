export default class DiarySong {
  constructor({ $page, data: { songs } }) {
    this.$page = $page;
    this.songs = songs;

    this.render();
  }
  render() {
    this.$songList = document.createElement("ul");
    this.$songList.innerHTML += this.songs
      .map((song) => `<li>${song.artist} - ${song.title}</li>`)
      .join("");

    this.$page.appendChild(this.$songList);
  }
}
