import { apiBaseUrl } from "../../../libraries/constants.js";
const axios = require("axios");

export default class DiaryTextModule {
  constructor(props = {}) {
    this.$page = props.$page;
    this.id = props.id;
    this.text = props.text;
    this.propertyName = props.propertyName;

    this.$text = props.element;
    this.$text.className = `Diary__${this.propertyName}`;

    this.render();

    this.$text.addEventListener("click", this.onClick.bind(this));
    this.$text.addEventListener("focusout", this.onFocusOut.bind(this));
  }

  render() {
    this.$text.innerHTML = this.text;
    this.$page.appendChild(this.$text);
  }

  onClick() {} // instance에서 정의

  async edit(id, text) {
    const result = await axios.put(`${apiBaseUrl}/daily/${id}`, text);
    this.text = result.data[this.propertyName];
  }

  async onFocusOut(e) {
    const text = e.target.value;
    if (this.id) {
      await this.edit(this.id, { [this.propertyName]: text });
    }
    this.$text.className = `Diary__${this.propertyName}`;
    this.$text.innerHTML = this.text;
  }
}
