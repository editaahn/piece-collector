import { youtubeApi } from "../../libraries/request";
import SearchHeader from "../components/Search/SearchHeader";
import SearchResult from "../components/Search/SearchResult";

export default class SearchSong {
  constructor({ addSongs }) {
    this.addSongs = addSongs;
    this.selectedSongs = [];

    this.select = this.select.bind(this);
    this.getSelected = this.getSelected.bind(this);
    this.clearSelected = this.clearSelected.bind(this);

    this.render();

    this.$input.addEventListener("keyup", this.search.bind(this));
  }

  render() {
    this.$root = document.getElementById("root");
    this.$layer = document.createElement("section");
    this.$layer.className = "popup SearchSong";

    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "Search__inputWrapper";

    this.$input = document.createElement("input");
    this.$input.className = "Search__input";
    this.$input.placeholder = "Type Keyword & Press Enter";

    this.searchHeader = new SearchHeader({
      $layer: this.$layer,
      addSongs: this.addSongs,
      getSelected: this.getSelected,
      clearSelected: this.clearSelected,
    });

    this.$wrapper.appendChild(this.$input);
    this.$layer.appendChild(this.$wrapper);
    this.$root.appendChild(this.$layer);

    this.searchResult = new SearchResult({
      $layer: this.$layer,
      select: this.select,
    });
  }

  async search(e) {
    if (e.key === "Enter") {
      const keyword = e.target.value;
      const { items, nextPageToken } = await youtubeApi.search(keyword);
      this.searchResult.setPage(0); // 페이지 초기화
      this.searchResult.setData({ items, nextPageToken }); // 데이터 주입
    }
  }

  getSelected() {
    return this.selectedSongs;
  }

  clearSelected() {
    this.selectedSongs = [];
  }

  select(data) {
    const isIncluded = this.selectedSongs.some(
      (song) => song.video_id === data.video_id
    );

    this.selectedSongs = isIncluded
      ? this.selectedSongs.filter((song) => song.video_id !== data.video_id) // 선택된 곡 재선택 시 선택 목록에서 빼기
      : this.selectedSongs.concat(data); // 선택 목록에 넣기

    const isSongSelected = this.getSelected().length;
    this.searchHeader.disableSubmit(isSongSelected ? false : true);
  }
}
