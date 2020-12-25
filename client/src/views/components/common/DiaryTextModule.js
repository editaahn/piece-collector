import { api } from "../../../libraries/request.js";

export default class DiaryTextModule {
  constructor(props = {}) {
    this.$page = props.$page;
    this.id = props.id;
    this.text = props.text;
    this.propertyName = props.propertyName;
    this.headImg = props.headImg;

    this.$text = props.element;
    this.$text.className = this.text
      ? `Diary__${this.propertyName}`
      : `Diary__${this.propertyName}--empty`;

    this.render();

    this.$text.addEventListener("click", this.onClick.bind(this));
    this.$text.addEventListener("focusout", this.onFocusOut.bind(this));
  }

  onClick() {} // instance에서 정의
  
  onFocusOut(e) {
    const text = e.target.value;
    this.text = text;

    if (this.id) {
      api.editText(this.id, { [this.propertyName]: text });
    }
    this.$text.className = text
      ? `Diary__${this.propertyName}`
      : `Diary__${this.propertyName}--empty`;
    this.$text.innerHTML = this.text.replace(/\n/g, "<br>");
  }
}
