import headImg from "../../../images/daily_head_song.svg";
import SearchSong from "../../pages/SearchSong.js";
import addButtonImg from "../../../images/daily_addsong.svg";
import { api } from "../../../libraries/request.js";
import store from "../../../state-management/index.js";

export default class DiarySong {
  constructor({ $page, data: { id, songs } }) {
    this.$page = $page;
    this.id = id;
    this.songs = songs;

    this.addSongs = this.addSongs.bind(this);

    this.render();
    this.$add.addEventListener("click", this.searchSong.bind(this));
    this.$songList.addEventListener("click", this.clickSong);
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

    this.id
      ? api.addSongs(this.id, { songs: this.songs }) // 등록된 다이어리를 수정할 때 DB에 직접 추가
      : store.dispatch("addSongsForNewDiary", newSongs); // 다이어리를 신규 등록할 때 state에만 추가
  }

  appendSongs(songs) {
    this.$songList.innerHTML += songs
      .map(
        (song) =>
          `<li 
            class="Diary__song" 
            data-videoid=${song.video_id}
          >
            ${song.title}
          </li>`
      )
      .join("");
  }

  clickSong(e) {
    if (e.target.className === "Diary__song") {
      window.newWindowData = {};
      window.newWindowData.videoId = e.target.dataset.videoid;
      window.open("../../youtubePlayback.html", "_blank");
    }
  }
}
