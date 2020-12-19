import Component from "../../state-management/Component.js";
import store from "../../state-management/index.js";
const axios = require("axios");

export default class Daily extends Component {
  constructor({ $root }) {
    super({
      store
    });
    this.$root = $root;
  }
  render() {
    this.$root.innerHTML = "";
    this.$root.textContent = "It's a diary"
  }
}
