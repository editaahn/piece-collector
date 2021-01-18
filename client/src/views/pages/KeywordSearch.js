import KeywordSearchHeader from "../components/Search/KeywordSearchHeader";
// import KeywordSearchResult from "../components/Search/KeywordSearchResult";

export default class KeywordSearch {
  constructor({ $root }) {
    this.$root = $root;
  }

  render() {
    this.$root.innerHTML = "";

    const $nav = document.createElement("header");
    const $page = document.createElement("section");

    $nav.className = "Search__header";
    $page.className = "page KeywordSearch";

    this.$input = document.createElement("input");
    this.$input.className = "Search__input";
    this.$input.placeholder = "Type Keyword & Press Enter";

    this.searchHeader = new KeywordSearchHeader({
      $page,
    });

    $page.appendChild(this.$input);
    this.$root.appendChild($page);

    // this.searchResult = new KeywordSearchHeader({
    // });
  }
}
