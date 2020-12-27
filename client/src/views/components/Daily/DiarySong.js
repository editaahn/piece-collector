import headImg from "../../../images/daily_head_song.svg";
import SearchSong from "../../pages/SearchSong.js";
import addButtonImg from "../../../images/daily_addsong.svg";
import { api } from "../../../libraries/request.js";

export default class DiarySong {
  constructor({ $page, data: { id, songs } }) {
    this.$page = $page;
    this.id = id;
    this.songs = songs;

    this.addSongs = this.addSongs.bind(this)

    this.render();
    this.$add.addEventListener("click", this.searchSong.bind(this));
  }

  render() {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "Diary__wrapper";

    this.$heading = document.createElement("h3");
    this.$heading.innerHTML = `<img src=${headImg} alt="song">`;

    this.$songList = document.createElement("ul");
    this.$songList.className = "Diary__songList";
    this.appendSongs(this.songs);

    this.$add = document.createElement("button");
    this.$add.className = "Diary__addSongs";
    this.$add.innerHTML = `<img src="${addButtonImg}" alt="add song"/>`;

    this.$wrapper.appendChild(this.$heading);
    this.$wrapper.appendChild(this.$songList);
    this.$wrapper.appendChild(this.$add);
    this.$page.appendChild(this.$wrapper);
  }

  searchSong() {
    this.searchSong = new SearchSong({
      addSongs: this.addSongs,
    });
  }

  addSongs(newSongs) {
    this.songs = newSongs;
    this.appendSongs(newSongs);
    api.editDailyData(this.id, { songs: this.songs });
  }

  appendSongs(songs) {
    this.$songList.innerHTML += songs
      .map(
        (song) => `<li class="Diary__song">${song.title}</li>`
      )
      .join("");
  }
}
