import { errorMessage } from "../../libraries/request.js";

export default class ErrorPage {
  constructor({ $page, error }) {
    this.$page = $page;
    this.error = error;

    console.groupCollapsed(`ERROR: ${error.status}`);
    console.error(error);
    console.error(errorMessage[error.status]);
    console.groupEnd();

    this.render();
  }

  render() {
    const $error = document.createElement("p");
    $error.className = `Error`;
    $error.textContent = "Error page (작업 예정)";
    this.$page.appendChild($error);
  }
}
