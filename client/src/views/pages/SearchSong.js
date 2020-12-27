import { youtubeApi } from "../../libraries/request";
import SearchResult from "../components/Search/SearchResult";

export default class SearchSong {
  constructor() {
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
    
    this.$wrapper.appendChild(this.$input);
    this.$layer.appendChild(this.$wrapper);
    this.$root.appendChild(this.$layer);

    this.searchResult = new SearchResult({
      $layer: this.$layer,
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
}
