const axios = require("axios");

export default class Monthly {
  constructor({ $root }) {
    this.$root = $root;
  }
  async fetchData() {
    const result = await axios.get(requestUrl);
    this.data = result.data;
    this.render();
  }
  render() {
    this.fetchData().then(
      () =>
        (this.$root.innerHTML = `<h1>${this.data.id}, I am Monthly Page</h1>`)
    );
  }
}