import headImg from "../../../images/daily_head_song.svg";
import SearchSong from "./SearchSong.js";
import addButtonImg from "../../../images/daily_addsong.svg";

export default class DiarySong {
  constructor({ $page, data: { songs } }) {
    this.$page = $page;
    this.songs = songs;

    this.render();

    this.$add.addEventListener("click", this.add.bind(this));
  }

  render() {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrapper";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt="song">`;

    this.$songList = document.createElement("ul");
    this.$songList.className = "Diary__songList";
    this.$songList.innerHTML += this.songs
      .map(
        (song) => `<li class="Diary__song">${song.artist} - ${song.title}</li>`
      )
      .join("");

    this.$add = document.createElement("button");
    this.$add.className = "Diary__addSong";
    this.$add.innerHTML = `<img src="${addButtonImg}" alt="add song"/>`;

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$songList);
    this.$wrapper.appendChild(this.$add);
    this.$page.appendChild(this.$wrapper);
  }

  add() {
    this.searchSong = new SearchSong();
  }
}
