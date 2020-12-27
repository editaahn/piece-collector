export default class SearchResult {
  constructor({ $layer }) {
    this.$layer = $layer;

    this.currentPage = 0;
    this.selectedSongs = [];

    this.$list = document.createElement("ul");
    this.$list.className = "Search__list";
    this.$list.addEventListener("click", this.select.bind(this));

    this.$layer.appendChild(this.$list);
  }

  setPage(page) {
    this.currentPage = page;
  }

  setData(data) {
    this.nextPageToken = data.nextPageToken;
    this.render(data.items);
  }

  render(items) {
    if (this.currentPage === 0) {
      this.$list.innerHTML = "";
    }

    this.appendItems(items);
    this.setPage(this.currentPage+1);
  }

  appendItems(items) {
    this.$list.innerHTML = items
      .map(
        (song) => `
        <li 
          class="Search__song" 
          data-videoid="${song.id.videoId}" 
          data-title="${song.snippet.title}"
        >
          <div class="Search__thumbnail">
            <img 
              src="${song.snippet.thumbnails.default.url}" 
              alt="thumbnail of ${song.snippet.title}" 
            />
          </div>
          <div class="Search__songInfo">
            <strong class="Search__songTitle">${song.snippet.title}</strong>
            <e class="Search__songReleased">${song.snippet.publishedAt.slice(0,7)}</e>
          </div>
        </li>
      `
      )
      .join("");
  }

  select(e) {
    if (e.target.closest("LI").className === "Search__song") {
      const song = e.target.closest("LI");
      const data = {
        videoId: song.dataset.videoid,
        title: song.dataset.title,
      };
      this.selectedSongs.push(data); // 추가할 아이템들
    }
  }
}
