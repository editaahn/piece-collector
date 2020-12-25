import { youtubeApi } from "../../../libraries/request";

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
  }

  async search(e) {
    if (e.key === "Enter") {
      const keyword = e.target.value;
      const { items, nextPageToken } = await youtubeApi.getSearchResult(keyword);
      
      this.searchResult = await new SearchResult({
        $page: this.$layer,
        items,
        nextPageToken,
      });
    }
  }
}
